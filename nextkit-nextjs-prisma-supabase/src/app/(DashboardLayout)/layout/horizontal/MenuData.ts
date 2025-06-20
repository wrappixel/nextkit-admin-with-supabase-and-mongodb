import { uniqueId } from "lodash";

const Menuitems = [

  {
    id: uniqueId(),
    title: "Home",
    icon: "tabler:",
    href: "",
    children: [
      {
        title: "Sample",
        icon: 'tabler:aperture',
        id: uniqueId(),
        href: "/",
      },
    ],
  },
  {
    id: uniqueId(),
    title: "Others",
    icon: "solar:layers-line-duotone",
    href: "",
    children: [
      {
        title: "Menu Level",
        id: uniqueId(),
        icon: 'tabler:layers-subtract',
        href: "",
        children: [
          {
            id: uniqueId(),
            title: "Level 1",
            icon: "tabler:circle",
            href: "/l1",
          },
          {
            id: uniqueId(),
            title: "Level 1.1",
            icon: "tabler:circle",
             href: "/l1.1",
            children: [
              {
                id: uniqueId(),
                title: "Level 2",
                icon: "tabler:circle",
                href: "/l2",
  
              },
              {
                id: uniqueId(),
                title: "Level 2.1",
                icon: "tabler:circle",
                href: "/l2.1",
  
                children: [
                  {
                    id: uniqueId(),
                    title: "Level 3",
                    icon: "tabler:circle",
                    href: "/l3",
                  },
                  {
                    id: uniqueId(),
                    title: "Level 3.1",
                    icon: "tabler:circle",
                    href: "/l3.1",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        title: "Disabled",
        icon: 'tabler:ban',
        id: uniqueId(),
        href: "#",
        disabled:true
      },
      {
        title: "SubCaption",
        icon: 'tabler:star',
        id: uniqueId(),
        href: "#",
        disabled:false,
        subtitle:"This is the subtitle"
      },
      {
        title: "Chip",
        icon: 'tabler:award',
        id: uniqueId(),
        href: "#",
        badge:true,
        badgeType:"filled"
      },
      {
        title: "Outlined",
        icon: 'tabler:mood-smile',
        id: uniqueId(),
        href: "#",
        badge:true,
        badgeType:"outlined"
      },
      {
        title: "External Link",
        icon: 'tabler:star',
        id: uniqueId(),
        href: "https://www.google.co.in/",
      },
    ],
  },
];
export default Menuitems;
