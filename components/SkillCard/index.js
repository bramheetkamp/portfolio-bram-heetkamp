import React from "react";

const SkillCard = ({ name, description }) => {
    return (
        <div className="w-full p-2 mob:p-4 rounded-lg transition-all ease-out duration-300 hover:bg-slate-50 hover:scale-105 cursor-pointer">
            <h1 className="text-3xl">{name ? name : "Heading"}</h1>
            <p className="mt-5 opacity-40 text-xl">
                {description
                    ? description
                    : "Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
            </p>
        </div>
    );
};

export default SkillCard;
