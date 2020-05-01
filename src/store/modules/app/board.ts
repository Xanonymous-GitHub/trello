import uuid from "@/utils/uuid";
export const board = {
  name: "workshop",
  columns: [
    {
      name: "Todo",
      id: uuid(),
      tasks: [
        {
          description: "",
          name: "first work",
          id: uuid(),
          userAssigned: false,
        },
        {
          description: "",
          name: "second work",
          id: uuid(),
          userAssigned: false,
        },
        {
          description: "",
          name: "third work",
          id: uuid(),
          userAssigned: false,
        },
      ],
    },
  ],
};
