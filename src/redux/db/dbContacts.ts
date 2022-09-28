//mock photos
import scorpion from "../../assets/images/avatar_scorpion.jpg";
import raiden from "../../assets/images/Raiden.jpg";
import kabal from "../../assets/images/Kabal.jpg";
import subzero from "../../assets/images/SubZero.jpg";
import joker from "../../assets/images/Joker.jpg";
import terminator from "../../assets/images/Terminator.jpg";
import robocop from "../../assets/images/Robocop.jpg";
import rambo from "../../assets/images/Rambo.jpg";
import liukang from "../../assets/images/LiuKang.jpg";
import jax from "../../assets/images/Jax.jpg";
import johnnycage from "../../assets/images/JohnnyCage.jpg";
import erronblack from "../../assets/images/ErronBlack.jpg";
import baraka from "../../assets/images/Baraka.jpg";

export const contacts = [
  {id: 1, name: "Scorpion", surname: "1", avatar: scorpion, chats: [], status: 3600, calls: [
    {
      userName: "Scorpion", 
      userSurname: "1",
      userConsumerID: 0,
      count: 1,
      time: 1515115311111,
      status: "Outgoing",
      duration: 300,
    },
  ]},
  {id: 2, name: "Raiden", surname: "2", avatar: raiden, status: 230, calls: [
    {
      userName: "Raiden", 
      userSurname: "2",
      userConsumerID: 0,
      count: 1,
      time: 1595115311111,
      status: "Incoming",
      duration: 180,
    },
    {
      userName: "Raiden", 
      userSurname: "2",
      userConsumerID: 0,
      count: 3,
      time: 1635115311111,
      status: "Incoming",
      duration: 840,
    },
  ]},
  {id: 3, name: "Kabal", surname: "3", avatar: kabal, status: 111555, calls: [
    {
      userName: "Kabal", 
      userSurname: "3",
      userConsumerID: 0,
      count: 1,
      time: 1625115311111,
      status: "Incoming",
      duration: 784,
    },
    {
      userName: "Kabal", 
      userSurname: "3",
      userConsumerID: 0,
      count: 1,
      time: 1631111111111,
      status: "Outgoing",
      duration: 840,
    },
    {
      userName: "Kabal", 
      userSurname: "3",
      userConsumerID: 0,
      count: 2,
      time: 1635111111111,
      status: "Missed",
      duration: 0,
    },
  ]},
  {id: 4, name: "Subzero", surname: "4", avatar: subzero, status: 3200, calls: [
    {
      count: 2,
      userName: "Subzero", 
      userSurname: "4",
      userConsumerID: 0,
      time: 1541111111111,
      status: "Incoming",
      duration: 2040,
    },
  ]},
  {id: 5, name: "Terminator", surname: "5", avatar: terminator, status: 4300, calls: [
    {
      userName: "Terminator", 
      userSurname: "5",
      userConsumerID: 0,
      count: 1,
      time: 1611111111111,
      status: "Incoming",
      duration: 56,
    },
    {
      userName: "Terminator", 
      userSurname: "5",
      userConsumerID: 0,
      count: 3,
      time: 1561111211111,
      status: "Outgoing",
      duration: 14,
    },
    {
      userName: "Terminator", 
      userSurname: "5",
      userConsumerID: 0,
      count: 1,
      time: 1651111111111,
      status: "Missed",
      duration: 0,
    },
    {
      userName: "Terminator", 
      userSurname: "5",
      userConsumerID: 0,
      count: 5,
      time: 1561211211111,
      status: "Missed",
      duration: 0,
    },
  ]},
  {id: 6, name: "Joker", surname: "6", avatar: joker, status: 60, calls: [
    {
      userName: "Joker", 
      userSurname: "6",
      userConsumerID: 0,
      count: 1,
      time: 1641111111111,
      status: "Outgoing",
      duration: 3600,
    },
  ]},
  {id: 7, name: "Robocop", surname: "7", avatar: robocop, phoneNumber: "799012384142", chats: [], status: 9, calls: [
    {
      userName: "Robocop", 
      userSurname: "7",
      userConsumerID: 0,
      count: 3,
      time: 1561111111111,
      status: "Missed",
      duration: 0,
    },
  ]},
  {id: 8, name: "Rambo", surname: "8", avatar: rambo, phoneNumber: "79138434211", link: "@Rambo", chats: [], status: 0, calls: [
    {
      userName: "Rambo", 
      userSurname: "8",
      userConsumerID: 0,
      count: 3,
      time: 1561111111111,
      status: "Missed",
      duration: 0,
    },
  ]},
  {id: 9, name: "Baraka", surname: "9", avatar: baraka, phoneNumber: "891238749581", link: "@Baraka", chats: [], status: 55000, calls: [
    {
      userName: "Baraka", 
      userSurname: "9",
      userConsumerID: 0,
      count: 3,
      time: 1561111111111,
      status: "Missed",
      duration: 0,
    },
  ]},
  {id: 10, name: "Jax", surname: "10", avatar: jax, phoneNumber: "89001145891", link: "@Jax", chats: [], status: 0, calls: [
    {
      userName: "Jax", 
      userSurname: "10",
      userConsumerID: 0,
      count: 3,
      time: 1561111111111,
      status: "Missed",
      duration: 0,
    },
  ]},
  {id: 11, name: "Johnny Cage", surname: "11", avatar: johnnycage, phoneNumber: "981247683491", link: "@JohnnyCage", chats: [], status: 12345, calls: [
    {
      userName: "Johnny Cage", 
      userSurname: "11",
      userConsumerID: 0,
      count: 3,
      time: 1561111111111,
      status: "Missed",
      duration: 0,
    },
  ]},
  {id: 12, name: "Erron Black", surname: "12", avatar: erronblack, phoneNumber: "89481385981", link: "@ErronBlack", chats: [], status: 61, calls: [
    {
      userName: "Erron Black", 
      userSurname: "12",
      userConsumerID: 0,
      count: 3,
      time: 1561111111111,
      status: "Missed",
      duration: 0,
    },
  ]},
  {id: 13, name: "Liu Kang", surname: "13", avatar: liukang, phoneNumber: "", chats: [], link: "@LiuKang", status: 1500000, calls: [
    {
      userName: "Liu Kang", 
      userSurname: "13",
      userConsumerID: 0,
      count: 3,
      time: 1561111111111,
      status: "Missed",
      duration: 0,
    },
  ]},
]