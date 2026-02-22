export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children? : FileNode[];
  collapsed?: boolean; // only for folders
}

export interface FileListResponse {
  sha: string;
  url: string;
  tree: ResponseNode[];
  truncated: boolean;
}

export interface ResponseNode{
  path: string;
  mode: string;
  type: string;
  size: number;
  url: string;
}
