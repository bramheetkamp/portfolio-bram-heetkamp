import { useRouter } from "next/router";
import React from "react";
import Button from "../Button";
import DarkModeToggle from "../DarkModeToggle";
import { Popover } from "@headlessui/react";
// Local Data
import data from "../../data/portfolio.json";

const Header = ({ handleWorkScroll, handleAboutScroll, isHome }) => {
    const router = useRouter();
    return (
        <>
            <Popover className="block tablet:hidden mt-5">
                {({ open }) => (
                    <>
                        <div className="flex items-center justify-between p-2 laptop:p-0">
                            <h1
                                onClick={() => router.push("/")}
                                className="font-medium cursor-pointer p-2 laptop:p-0"
                            >
                                {data.name}.
                            </h1>
                            <Popover.Button>
                                <img
                                    className="h-5"
                                    src={`/images/${
                                        !open ? "menu.svg" : "cancel.svg"
                                    }`}
                                ></img>
                            </Popover.Button>
                        </div>
                        <Popover.Panel className="absolute right-0 z-10 w-11/12 p-4 bg-white shadow-md rounded-md">
                                <div className="grid grid-cols-1">
                                    <Button onClick={isHome ? handleWorkScroll : () => router.push("/project")}>
                                        Work
                                    </Button>
                                    {isHome && (
                                        <Button onClick={handleAboutScroll}>
                                            About
                                        </Button>
                                    )}
                                    <Button
                                        onClick={() => router.push("/blog")}
                                    >
                                        Blog
                                    </Button>
                                    <a download href="/files/cv-en-2023.pdf">
                                        <Button>
                                            Resume
                                        </Button>
                                    </a>
                                    <Button
                                        onClick={() =>
                                            window.open("mailto:hello@bramheetkamp.nl")
                                        }
                                    >
                                        Contact
                                    </Button>
                                    <DarkModeToggle></DarkModeToggle>
                                </div>
                        </Popover.Panel>
                    </>
                )}
            </Popover>
            <div className="mt-10 flex flex-row items-center justify-between sticky bg-white top-0 z-10 hidden tablet:flex">
            <h1
                onClick={() => router.push("/")}
                className="font-medium cursor-pointer mob:p-2 laptop:p-0"
            >
                {data.name}.
            </h1>
                <div className="flex">
                    <Button onClick={isHome ? handleWorkScroll : () => router.push("/project")}>
                        Work
                    </Button>
                    {isHome && (
                        <Button onClick={handleAboutScroll}>
                            About
                        </Button>
                    )}
                    <Button onClick={() => router.push("/blog")}>
                        Blog
                    </Button>
                                        <Button>
                                    <a download href="/files/cv-en-2023.pdf">
                                            Resume
                                    </a>
                                        </Button>
                    <Button
                        onClick={() =>
                            window.open("mailto:hello@bramheetkamp.nl")
                          }
                    >
                        Contact
                    </Button>
                    <DarkModeToggle></DarkModeToggle>
                </div>
            </div>
        </>
    );
};

export default Header;
