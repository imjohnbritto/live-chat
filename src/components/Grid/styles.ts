import { styled } from '@mui/system';
import { IGridTypes } from '.';

export const GridWrapper = styled('div')`
  display: ${({ grid }: IGridTypes) => (grid ? 'grid' : 'flex')};
  margin: ${({ gutter }: IGridTypes) =>
    gutter ? gutter.join('px ') + 'px' : '0'};
  padding: ${({ padding }: IGridTypes) =>
    padding ? padding.join('px ') + 'px' : '0'};
  flex-direction: ${({ direction }: IGridTypes) =>
    direction ? direction : 'row'};
  grid-template-columns: ${({ column }: IGridTypes) =>
    column ? `repeat(${column}, auto)` : ''};
  grid-template-rows: ${({ row }: IGridTypes) =>
    row ? `repeat(${row}, 150px)` : ''};
  gap: ${({ gap }: IGridTypes) => (gap ? `${gap}px` : '0px')};
  justify-content: ${({ justifyContents }: IGridTypes) =>
    justifyContents ? justifyContents : 'left'};
  align-items: ${({ alignItems }: IGridTypes) =>
    alignItems ? alignItems : ''};
  flex: ${({ flex }: IGridTypes) => flex};
`;
