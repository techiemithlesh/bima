import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ leftItems, middleContent, rightItems }) => {
  return (
    <div className="flex items-center bg-gray-200 p-4">
      <div>
        {leftItems &&
          leftItems.map((item, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <span className="mr-2">&nbsp;{"<"}</span>}
              {item.link ? (
                <Link
                  to={item.link}
                  className="text-blue-500 text-xl cursor-pointer"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="text-blue-500 text-xl cursor-pointer">
                  {item.label}
                </span>
              )}
            </React.Fragment>
          ))}
      </div>
      <div className="flex-1 text-center mx-4">
        <p className="font-bold">
          {middleContent && <span>{middleContent}</span>}
        </p>
      </div>
      <div>
        {rightItems && (
          <button className="text-white px-16 rounded-full py-2 rounded bread_crumb_btn">
            {rightItems.label}
          </button>
        )}
      </div>
    </div>
  );
};

export default BreadCrumb;
