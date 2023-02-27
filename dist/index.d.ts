export type Options = {
    index: string;
    type: string;
    hash: string;
    fileName: string;
    filePath: string;
    children?: Options[];
};
export type LsTreeResult = Array<Options> | Promise<Array<Options>>;
export type LsTreeCallBack = (options: Options) => void;
export declare function lsTree(head: string, callback: LsTreeCallBack): LsTreeResult;
export declare function lsTree(head: string, callback: LsTreeCallBack, cwd: string): LsTreeResult;
export declare function lsTree(head: string, callback: LsTreeCallBack, cwd: string, filePath: string): LsTreeResult;
export type GInfoResUlt = {
    tree: LsTreeResult;
    treeMap: TreeMap;
};
export type TreeMap = {
    [key: string]: Options;
};
export declare function gInfo(head: string): Promise<GInfoResUlt>;
export declare function gInfo(head: string, cwd: string): Promise<GInfoResUlt>;
export declare function showGInfo(hash: string): string;
export declare function showGInfo(hash: string, cwd: string): string;
export default gInfo;
