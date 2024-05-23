import { ImageSourcePropType } from "react-native";

export type MessagesType={
    id: number;
    name: string;
    message: string;
    time: string;
    date: string;
    image: ImageSourcePropType;
}

export const messages: Array<MessagesType> =
    [
        {
            id: 1,
            name: "Dr. Drake Boeson",
            message: "My pleasure. All the best ...",
            time: "10:00 AM",
            date: "Today",
            image: require("../../assets/images/chat/doc1.png"),
        },
        {
            id: 2,
            name: "Dr. Aidan Allende",
            message: "Your solution is great! 🔥",
            time: "18:00 PM",
            date: "Yesterday",
            image: require("../../assets/images/chat/doc2.png"),
        },
        {
            id: 3,
            name: "Dr. Salvatore Heredia",
            message: "Thanks for the help 🙏",
            time: "10:30 AM",
            date: "20/12/2022",
            image: require("../../assets/images/chat/doc3.png"),
        },
        {
            id: 4,
            name: "Dr. Delaney Mangino",
            message: "I have recovered, thank ...",
            time: "17:00 PM",
            date: "14/12/2022",
            image: require("../../assets/images/chat/doc4.png"),
        },
        {
            id: 5,
            name: "Dr. Beckett Calger",
            message: "I went there yesterday 😄",
            time: "09:30 AM",
            date: "26/11/2022",
            image: require("../../assets/images/chat/doc5.png"),
        },
        {
            id: 6,
            name: "Dr. Bernard Bliss",
            message: "IDK what else is there to do ...",
            time: "10:00 AM",
            date: "09/11/2022",
            image: require("../../assets/images/chat/doc6.png"),
        },
        {
            id: 7,
            name: "Dr. Jada Srnsky",
            message: "I advise you to take a break",
            time: "15:30 PM",
            date: "09/11/2022",
            image: require("../../assets/images/chat/doc7.png"),
        },

    ]