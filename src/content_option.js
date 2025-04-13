const logotext = "GEORGE";
const meta = {
    title: "George Kelly",
    description: "Film Producer & Creative Director with experience in feature films, documentaries, and commercials",
};

const introdata = {
    title: "George Kelly",
    animated: {
        first: "Film Producer",
        second: "Creative Director",
        third: "Storyteller",
    },
    description: "Aspiring film industry professional with expertise in production management, creative direction, and storytelling. Passionate about creating cinematic experiences that captivate and inspire.",
    your_img_url: process.env.PUBLIC_URL + "/img/profile_headshot.webp",
};

const dataabout = {
    title: "About Me",
    aboutme: "Aspiring film industry professional with a robust academic background in Film Studies from Queen Mary University of London. Skilled in video editing, production management, and storytelling, seeking to leverage my passion for technology and film to gain hands-on experience and contribute to creative projects.",
    profile_img: process.env.PUBLIC_URL + "/img/profile_headshot.webp",
    camera_work_img1: process.env.PUBLIC_URL + "/img/camera1.webp",
    camera_work_img2: process.env.PUBLIC_URL + "/img/camera2.webp",
    philosophy: "I believe in the power of visual storytelling to connect, inspire, and transform. Every frame is an opportunity to capture authentic moments that resonate with audiences."
};

const worktimeline = [
    {
        jobtitle: "Production Manager",
        where: "Spectrum Labs - Los Angeles, US",
        date: "2022-2023",
        description: "Orchestrated filming and editing schedules, ensuring efficient workflow and timely completion of projects. Managed equipment checks and contributor attendance, enhancing production quality and team coordination."
    },
    {
        jobtitle: "Creative Director",
        where: "Nimblebabies - London, UK",
        date: "2021-2022",
        description: "Spearheaded the production of high-engagement content, overseeing the creative process from inception to execution. Masterminded the development of content briefs and detailed storyboards."
    },
    {
        jobtitle: "Assistant Director / Story Producer",
        where: "Pictures in Motion - London, UK",
        date: "2020-2021",
        description: "Assisted in camera setup, rigging processes, and conducted master interviews, contributing to the smooth operation of production sets."
    },
    {
        jobtitle: "Film Internship",
        where: "Chocolate Films - London, UK",
        date: "2019-2020",
        description: "Supported filming operations and social media content creation, demonstrating versatility and a keen eye for detail."
    },
    {
        jobtitle: "Work Experience Participant",
        where: "Channel 4",
        date: "2019",
        description: "Enhanced research abilities, creative writing, presentation skills, and understanding of TV production and commissioning processes."
    }
];

const skills = [
    {
        name: "Adobe Creative Suite",
        value: 90
    },
    {
        name: "Video Production",
        value: 85
    },
    {
        name: "Spanish (Native)",
        value: 100
    },
    {
        name: "Organization",
        value: 95
    },
    {
        name: "Time Management",
        value: 90
    },
    {
        name: "Team Collaboration",
        value: 85
    }
];

const services = [{
        title: "Film Production",
        description: "Full-service film production including pre-production planning, on-set management, and post-production coordination for feature films, documentaries, and commercials.",
    },
    {
        title: "Creative Direction",
        description: "Comprehensive creative leadership from concept development to final execution, including storyboarding, visual design, and production oversight.",
    },
    {
        title: "Content Development",
        description: "Strategic content creation focused on storytelling that resonates with target audiences, combining artistic vision with commercial viability.",
    },
];

const dataportfolio = [
    {
        img: "https://i.ytimg.com/vi/FI2K2rkOWQM/maxresdefault.jpg",
        description: "Official trailer for Season 1 of Ready Set StartUP UK where I served as assistant director",
        link: "https://www.youtube.com/watch?v=FI2K2rkOWQM",
        category: "directed",
        title: "Ready Set StartUP UK - Season 1 Trailer",
        featured: true,
        id: "ready-set-startup"
    },
    {
        img: "https://i.ytimg.com/vi/Ny5jE-MvLlI/maxresdefault.jpg",
        description: "Commercial video for Nimble showcasing their products designed to make cleaning easier for parents",
        link: "https://www.youtube.com/watch?v=Ny5jE-MvLlI",
        category: "produced",
        title: "Nimble - Cleaning Made Simple",
        featured: true,
        id: "nimble-commercial"
    },
    {
        img: "https://i.ytimg.com/vi/SsoEa68Y9qo/maxresdefault.jpg",
        description: "Music video for Maximilli3n's track ZIGZAG featuring dynamic visuals and creative direction",
        link: "https://www.youtube.com/watch?v=SsoEa68Y9qo",
        category: "directed",
        title: "Maximilli3n - ZIGZAG",
        featured: true,
        id: "zigzag"
    },
    {
        img: "https://i.ytimg.com/vi/y4JQ1uZkVs8/maxresdefault.jpg",
        description: "Music video for Maximilli3n's BISOUS with artistic cinematography and storytelling",
        link: "https://www.youtube.com/watch?v=y4JQ1uZkVs8",
        category: "directed",
        title: "Maximilli3n - BISOUS",
        featured: true,
        id: "bisous"
    },
    {
        img: "https://i.ytimg.com/vi/1RxrMKiKdpU/maxresdefault.jpg",
        description: "Mission Makers Podcast episode providing expert insights on TED Talk preparation and delivery",
        link: "https://www.youtube.com/watch?v=1RxrMKiKdpU",
        category: "produced",
        title: "How To Deliver a TED Talk | Mission Makers",
        featured: true,
        id: "ted-talk"
    },
    {
        img: "https://i.ytimg.com/vi/0eNVeoN7RJ4/maxresdefault.jpg",
        description: "Production and direction for Mission Makers Podcast exploring purpose-driven leadership",
        link: "https://www.youtube.com/watch?v=0eNVeoN7RJ4",
        category: "produced",
        title: "The Power of Purpose | Mission Makers",
        featured: true,
        id: "purpose"
    },
    {
        img: "https://i.ytimg.com/vi/JMUrpccemKE/maxresdefault.jpg",
        description: "Educational content for Mission Makers Podcast on podcast production techniques",
        link: "https://www.youtube.com/watch?v=JMUrpccemKE",
        category: "produced",
        title: "How to Produce A Podcast | Mission Makers",
        featured: false,
        id: "produce-podcast"
    },
    {
        img: "https://i.ytimg.com/vi/7VuJi3JSBjo/maxresdefault.jpg",
        description: "A short film exploring the themes of value and perception through a seemingly simple piece of jewelry",
        link: "https://www.youtube.com/watch?v=7VuJi3JSBjo",
        category: "dop",
        title: "The Necklace (Short Film)",
        featured: true,
        id: "necklace"
    }
];

// Portfolio categories for filtering
const portfolioCategories = [
    {
        name: "All",
        value: "all"
    },
    {
        name: "Directed",
        value: "directed"
    },
    {
        name: "Produced/Edited",
        value: "produced"
    },
    {
        name: "Director of Photography",
        value: "dop"
    }
];

const contactConfig = {
    YOUR_EMAIL: "Georgekelly00@icloud.com",
    description: "Interested in collaborating on a project or have questions about my work? Feel free to reach out. I'm always open to discussing new creative opportunities.",
    YOUR_SERVICE_ID: "service_wnxzyoi",
    YOUR_TEMPLATE_ID: "template_paft5r8",
    YOUR_USER_ID: "SYxCBvOHFeAdfu_L_",
};

const socialprofils = {
    instagram: "https://instagram.com",
};

// New section for education and certifications
const education = [
    {
        degree: "B.A. Film Studies",
        institution: "Queen Mary University London",
        year: "2020-2023",
        description: "Comprehensive study of film theory, history, and production techniques."
    },
    {
        degree: "Digital Filmmaking & Documentary",
        institution: "Council on International Education Exchange (CIEE)",
        year: "2018",
        description: "Specialized program in Sevilla, Spain focusing on documentary filmmaking and digital production."
    }
];

// New section for professional imagery showcase
const professionalImages = {
    title: "BEHIND THE CAMERA",
    description: "As a filmmaker, I'm deeply passionate about every aspect of production. Whether I'm operating equipment, directing a scene, or finalizing the perfect edit, my goal is always to create compelling visual stories that resonate with audiences.",
    images: [
        {
            img: process.env.PUBLIC_URL + "/img/camera_work1.webp",
            title: "On Set Direction",
            description: "Operating professional equipment on commercial productions",
            details: "Captured during a commercial shoot in London where I served as the Director of Photography, managing a team of camera operators while ensuring the creative vision aligned with the client's expectations."
        },
        {
            img: process.env.PUBLIC_URL + "/img/camera_work2.webp",
            title: "Technical Precision",
            description: "Fine-tuning camera settings to achieve the perfect shot",
            details: "Working with advanced camera equipment on a documentary project, where lighting conditions and fast-paced environments required quick technical adjustments and creative problem-solving."
        },
        {
            img: process.env.PUBLIC_URL + "/img/profile_headshot.webp",
            title: "Professional Profile",
            description: "Bringing a creative director's eye to every project",
            details: "Professional headshot taken during a film festival where I was presenting my work and connecting with industry professionals to discuss emerging trends in visual storytelling."
        }
    ]
};

export {
    meta,
    dataabout,
    dataportfolio,
    worktimeline,
    skills,
    services,
    introdata,
    contactConfig,
    socialprofils,
    logotext,
    portfolioCategories,
    professionalImages,
    education,
};