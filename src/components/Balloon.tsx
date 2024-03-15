import React from "react";

const Balloon: React.FC = (props) => {
    return (
        <div className="p-3">
            <div className="flex flex-col justify-start align-middle">
                <p className="text-3xl">{props.info}</p>;
            </div>
        </div>
    )
}

export default Balloon;