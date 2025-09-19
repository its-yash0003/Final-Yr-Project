import {
    mobile,
    backend,
    creator,
    web,
    chatbot,
    wellness,
    sentiment,
    
  } from "../assets";
  
  export const navLinks = [
    // {
    //   id: "about",
    //   title: "Resources",
    //   link: "/resources/articles",
    // },
    // {
    //   id: "work",
    //   title: "Tools",
    //   link: "/resources/articles",
    // },
    // {
    //   id: "contact",
    //   title: "Contact",
    //   link: "/resources/articles",
    // },
  ];
  
  const services = [
    {
      title: "Articles",
      icon: web,
      link: "/articles",
    },
    {
      title: "Motivation",
      icon: mobile,
      link: "/motivation",
    },
    {
      title: "Meditation",
      icon: backend,
      link: "/meditation",
    },
    {
      title: "Yoga and Fitness",
      icon: creator,
      link: "/yoga",
    },
    // {
    //   title: "GeetaGPT",
    //   icon: web,
    // },
    // {
    //   title: "Default",
    //   icon: mobile,
    // },
    // {
    //   title: "Default",
    //   icon: backend,
    // },
    // {
    //   title: "Default",
    //   icon: creator,
    // },
  ];

 export const tools =[
  {
    title: "Your Health Assistent",
    icon: chatbot,
    link: "/assistant"
  },
  {
    title: "Your Wellness Plans",
    icon: wellness,
    link: "/wellness"
  },
  {
    title: "Sentiment Analysis",
    icon: sentiment,
    link: "/sentiment"
  },
];
  
  export { services,};
