import React from "react";
import data from "./data";

function dummyText() {
  const { title } = data;
  return (
    <div>
      <header>
        <h1>Content</h1>
        <h2 className="text-3xl">{title}</h2>
      </header>
      <main>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
          architecto quia mollitia non, quisquam excepturi, blanditiis
          reprehenderit facilis quidem porro eligendi tenetur impedit ducimus
          quo commodi error in doloremque animi sed exercitationem. Quod
          doloremque perferendis fugit possimus, minima aut ipsa dolor at soluta
          accusamus, ipsam dolorem nulla eligendi! Magnam porro quo officiis
          suscipit iusto saepe alias culpa ipsam quis illo tempore, aliquid
          iste, sunt modi. Totam facere, maxime voluptatibus fuga temporibus
          illo voluptatum reprehenderit quisquam repellendus vero nam
          perferendis illum asperiores nulla optio placeat non, sapiente quas
          neque dolor deleniti ducimus? Excepturi eaque recusandae earum
          laboriosam reprehenderit veritatis esse rem?
        </p>
        <img
          src="https://img.freepik.com/free-vector/cryptocurrency-bitcoin-golden-coin-background_1017-31505.jpg?w=2000&t=st=1688526634~exp=1688527234~hmac=efd38e6256d7f3db47b4a264f4bd1bbc2b266aa8d3e9282cf2d38ec5b4c9f1f6"
          alt="bitcoin"
          className="mt-5"
        />
        <p className="pt-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam quaerat
          labore, possimus quasi nemo deleniti laudantium culpa sit amet
          excepturi, doloribus, et dolorem. Reiciendis hic ratione quaerat
          commodi! Facere earum unde blanditiis quibusdam ad dicta magnam
          pariatur exercitationem, eveniet rem iure, omnis dolore, neque placeat
          sapiente vel quis ipsum non magni hic nam officiis quam inventore.
          Ratione corrupti sed expedita blanditiis quasi nemo optio distinctio
          harum repellendus, nam inventore temporibus cupiditate, facere eum
          quidem praesentium iste placeat quos cumque.
        </p>
      </main>
    </div>
  );
}

export default dummyText;
