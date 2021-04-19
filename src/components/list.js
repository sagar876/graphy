import React from "react";

const List = ({ isOver, children }) => {
    const className = isOver ? " highlight-region" : "";

    return (
        <div className={`col${className}`}>
            {children}
        </div>
    );
};

export default List;