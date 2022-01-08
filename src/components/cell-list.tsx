import { useTypedSelector } from "../hooks/use-typed-selector";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => {
    if (state.cells) {
      return state.cells.order.map((id) => {
        if (state.cells) {
          return state.cells.data[id];
        }
      });
    }
  });
  if (cells) {
    const renderedCells = cells.map((cell) => (
      <Fragment key={cell ? cell.id : null}>
        <CellListItem key={cell ? cell.id : null} cell={cell ? cell : null} />
        <AddCell previousCellId={cell ? cell.id : null} />
      </Fragment>
    ));

    return (
      <div>
        <div className={cells.length === 0 ? "force-visible" : ""}>
          <AddCell previousCellId={null} />
        </div>
        {renderedCells}
      </div>
    );
  }
  return <div></div>;
};

export default CellList;
