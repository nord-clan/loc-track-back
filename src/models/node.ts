import type { ILayer } from './layer';

export type Tuple = [number, number];

export interface INode {
  id: string;
  pos: Tuple;
  angle: number;
  width: number;
  height: number;
  type: string;
  layerId: string;

  typeInfo?: INodeType;
  layer?: ILayer;
  data?: INodeData;
}

export interface INodeType {
  name: string;
  size: [number, number];
  numberOfUsers?: number;
  createdAt: Date;
}

export interface INodeData {
  index: number;
  allowMove: boolean;
  allowResize: boolean;

  backgroundSrc?: string;
  customCss?: string;
}
