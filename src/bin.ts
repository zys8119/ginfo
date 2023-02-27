import {gInfo, showGInfo} from "./index"
const ncol = require("ncol")
;(async ()=>{
    const options = Object.fromEntries(process.argv.reduce((a, b)=>{
        const curr = a[a.length - 1]
        if(!curr || curr.length === 2){
            a.push([b])
        }else {
            curr.push(b)
        }
        return a
    }, []))
    const cwd = options['--cwd'] || options['-c'] || process.cwd()
    const head = options['-h'] || options['--hash'] || null
    const file = options['-f'] || options['--file'] || null
    const help = options.hasOwnProperty('--help')
    if(help){
        return ncol.color(function (){
            return this
                .info('Options:\n')
                .info(' -c --cwd 工作目录，默认当前目录\n')
                .info(' -h --hash git commit hash\n')
                .info(' -f --file 需要查看的文件\n')
                .info(' --help 查看帮助\n')
        })
    }
    if(head){
        const list = await gInfo(head, cwd)
        if(file){
            const info = list.treeMap[file]
            const content = showGInfo(info.hash, cwd)
            console.log(content)
        }else {
            console.log(list)
        }
    }
})()

