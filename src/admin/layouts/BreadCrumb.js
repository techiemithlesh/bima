import React from "react";
import { Link } from "react-router-dom";
import { TabsIcon } from "../../shared/Assets";

const BreadCrumb = ({ leftItems, middleContent, rightItems }) => {
  return (
    <div className="flex items-center bg-gray-200 p-4 breadcumb">
      <div>
        {leftItems &&
          leftItems.map((item, index) => (
            <React.Fragment key={index}>
              {index !== 0 && <span className="mr-2">&nbsp;<img className="arrow" src={TabsIcon.arrow} alt=""/></span>}
              {item.link ? (
                <Link
                  to={item.link}
                  className=" text-xl cursor-pointer page"
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
          <div className="flex items-center">
            {rightItems}
          </div>
        )}
      </div>
    </div>
  );
};

export default BreadCrumb;
