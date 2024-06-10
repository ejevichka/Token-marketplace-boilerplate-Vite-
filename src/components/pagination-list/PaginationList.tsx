import type { CellRenderer, MasonryCellProps } from "react-virtualized/dist/es/Masonry";
import { Masonry } from "react-virtualized/dist/es/Masonry";
import { UnsplashImage } from "../../domains/unsplash";
import { CellMeasurer, CellMeasurerCache, createMasonryCellPositioner, AutoSizer } from "react-virtualized";
import { useMemo, useEffect } from "react";
import useElementSize from "@custom-react-hooks/use-element-size";

const cellMeasurerCache = new CellMeasurerCache({
  defaultHeight: 250,
  defaultWidth: 200,
  fixedWidth: true,
});

export const PaginatedImageList: React.FC<{ images: UnsplashImage[]; currentPage: number }> = ({ images }) => {
  const [setRef, size] = useElementSize();

  const columnWidth = Math.floor(size.width / 3) - 10; // Dynamic column width
  const columnCount = Math.max(Math.floor(size.width / (columnWidth + 10)), 1); // Column count based on dynamic width

  const cellPositionerConfig = {
    cellMeasurerCache,
    columnCount,
    columnWidth,
    spacer: 10,
  };

  const cellPositioner = useMemo(() => createMasonryCellPositioner(cellPositionerConfig), [columnCount, columnWidth]);

  // Reset caches when images change
  useEffect(() => {
    cellMeasurerCache.clearAll();
    cellPositioner.reset(cellPositionerConfig);
  }, [images]);

  const renderer = useMemo(() => {
    return createRenderer(images, (image) => {
      const aspectRatio = image.width / image.height;
      const height = columnWidth / aspectRatio; // Calculate height based on dynamic width
      return (
        <picture>
          <img
            title={image.description || ""}
            src={image.urls.small}
            style={{ width: `${columnWidth}px`, height: `${height}px`, display: 'block' }} // Set width and height dynamically
          />
        </picture>
      );
    });
  }, [images, columnWidth]);

  return (
    <div ref={setRef} style={{ width: "100%" }}>
      <Masonry
        cellPositioner={cellPositioner}
        cellRenderer={renderer}
        cellMeasurerCache={cellMeasurerCache}
        cellCount={images.length}
        autoHeight
        width={size.width}
        height={size.height}
      />
    </div>
  );
};

function createRenderer<T>(
  data: T[],
  renderElement: (data: T, props: MasonryCellProps) => React.ReactElement
): CellRenderer {
  return (props) => {
    const datum = data[props.index];

    return (
      <AutoSizer>
        {() => (
          <CellMeasurer cache={cellMeasurerCache} index={props.index} key={props.key} parent={props.parent}>
            <div style={props.style}>{renderElement(datum, props)}</div>
          </CellMeasurer>
        )}
      </AutoSizer>
    );
  };
}
