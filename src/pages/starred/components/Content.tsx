import React from "react";
import ActionIcons from "@/pages/home/components/ActionIcons";
import ListItem from "@/pages/home/components/ListItem";

function Content({ data, onCheck }) {
  const handleCheckboxChange = (id) => {
    onCheck(id); // Notify parent component about the checkbox change
  };

  return (
    <>
      {data?.map((item) => {
        return (
          <div key={item.id}>
            <ListItem
              isMarked={item.isMarked}
              name={item.name}
              desc={item.description}
              message={item.message}
              handleChange={() => handleCheckboxChange(item.id)} // Pass the id to handleChange
              time={item.time}
              buttonType="action"
              actionButtons={<ActionIcons doc={item.description} />}
            />
          </div>
        );
      })}
    </>
  );
}

export default Content;
