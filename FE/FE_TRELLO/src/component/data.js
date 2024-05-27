
export const data = {
    columns: [
        {
            id: "column-1",
            columnName: 'Todo 1',
            cards: [
                {
                    id: "card 1",
                    content: 'Title of card 1',
                    columnId: "column-1"

                },
                {
                    id: "card 2",
                    content: 'Title of card 2',
                    columnId: "column-1"

                },
                {
                    id: "card 3",
                    content: 'Title of card 3',
                    columnId: "column-1"

                }


            ]
        },
        {
            id: "column-2",
            columnName: 'Todo 2',

            cards: [
                {
                    id: "card 4",
                    content: 'Title of card 4',
                    columnId: "column-2"

                }


            ]
        },
        {
            id: "column-3",
            columnName: 'Todo 3',

            cards: [
                {
                    id: "card 6",
                    content: 'Title of card 6',
                    columnId: "column-3"

                }


            ]
        },
        {
            id: "column-4",
            columnName: 'Todo 4',

            cards: [
                {
               id:"card-empty",
               columnId:"column-4",
               FE_PlaceholderCard:true
                }
            ]
        }
    ]
}
