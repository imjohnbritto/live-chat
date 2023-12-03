import { ReactNode, HTMLAttributes } from 'react';
import { GridWrapper } from './styles';

export interface IGridTypes extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  gutter?:
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number];
  padding?:
    | [number]
    | [number, number]
    | [number, number, number]
    | [number, number, number, number];
  direction?: 'column' | 'row';
  justifyContents?:
    | 'top'
    | 'left'
    | 'bottom'
    | 'right'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?:
    | 'top'
    | 'left'
    | 'bottom'
    | 'right'
    | 'center'
    | 'flex-start'
    | 'flex-end'
    | 'space-between';
  grid?: boolean;
  row?: number;
  column?: number;
  gap?: number;
  flex?: number;
}

const Grid = ({ children, ...props }: IGridTypes) => {
  return <GridWrapper {...props}>{children}</GridWrapper>;
};

export default Grid;
