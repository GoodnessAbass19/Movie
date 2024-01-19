import React from "react";

const page = ({
  searchParams,
}: {
  searchParams: { search: string | undefined };
}) => {
  return (
    <div>
      page Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque
      ducimus maxime nostrum maiores totam nemo laboriosam, laudantium inventore
      dolor sunt reiciendis necessitatibus corrupti nihil facilis officia
      numquam cum iure id!
      {searchParams.search}
    </div>
  );
};

export default page;
