import {execSync} from "child_process"
const defaultCwd = process.cwd()

export type Options = {
    index:string
    type:string
    hash:string
    fileName:string
    filePath:string
    children?:Options[]
}
export type LsTreeResult = Array<Options> | Promise<Array<Options>>
export type LsTreeCallBack = (options:Options)=>void
export function lsTree(head:string, callback:LsTreeCallBack):LsTreeResult
export function lsTree(head:string, callback:LsTreeCallBack, cwd:string):LsTreeResult
export function lsTree(head:string, callback:LsTreeCallBack, cwd:string, filePath:string):LsTreeResult
export async function lsTree(head:string, callback?:LsTreeCallBack, cwd?:string, filePath:string = ''){
    try {
        return await Promise.all(execSync(`git ls-tree ${head}`, {encoding:'utf-8', cwd:cwd || defaultCwd}).split('\n')
            .filter(e=>e)
            .map(async e=>{
                const [index, type, hash, fileName] = e.replace(/\s+/g,',').split(',')
                const prevFilePath = filePath + (filePath ? '/' : '') + fileName
                const children = type === 'tree' ? await lsTree(hash, callback, cwd, prevFilePath) : []
                const result = {index, type, hash, fileName, children, filePath:prevFilePath}
                callback?.(result)
                return result
            }))
    }catch (e){
        return []
    }
}
export type GInfoResUlt = {
    tree:LsTreeResult,
    treeMap:TreeMap
}
export type TreeMap = {
    [key:string]:Options
}
export function gInfo(head:string):Promise<GInfoResUlt>
export function gInfo(head:string, cwd:string):Promise<GInfoResUlt>
export async function gInfo(head:string, cwd?:string):Promise<GInfoResUlt>{
    const treeMap = {}
    const tree = await lsTree(head, (e)=>{
        treeMap[e.filePath] = e;
    }, cwd)
    return {
        tree,
        treeMap,
    }
}
export function showGInfo(hash:string):string
export function showGInfo(hash:string, cwd:string):string
export function showGInfo(hash:string, cwd?:string){
    return execSync(`git show ${hash}`, {cwd:cwd || defaultCwd, encoding:'utf-8'})
}
export default gInfo
