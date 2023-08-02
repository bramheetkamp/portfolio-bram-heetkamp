import React, { useState } from "react";
import Button from "../Button";
import TextareaAutosize from "react-textarea-autosize";
import "react-datepicker/dist/react-datepicker.css";

const ProjectEditor = ({ project, close, refresh }) => {
  const [currentTabs, setCurrentTabs] = useState("PROJECTDETAILS");
  const [projectContent, setProjectContent] = useState(project.content);
  const [projectVariables, setProjectVariables] = useState({
    title: project.title,
    tagline: project.tagline,
    preview: project.preview,
    image: project.image,
  });

  const saveProject = async () => {
    if (process.env.NODE_ENV === "development") {
      await fetch("/api/project/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: project.slug,
          content: projectContent,
          variables: projectVariables,
        }),
      }).then((data) => {
        if (data.status === 200) {
          close();
          refresh();
        }
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  return (
    <div className="fixed z-10 w-screen h-screen overflow-auto top-0 flex flex-col items-center bg-white">
      <div className="container my-20">
        <div className="mt-10">
          <div className="z-10 sticky top-12">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl">{projectVariables.title}</h1>
              <div className="flex items-center">
                <Button onClick={saveProject} type="primary">
                  Save
                </Button>
                <Button onClick={close}>Close</Button>
              </div>
            </div>
            <div className="flex items-center">
              <Button
                onClick={() => setCurrentTabs("PROJECTDETAILS")}
                type={currentTabs === "PROJECTDETAILS" && "primary"}
              >
                Project Details
              </Button>
              <Button
                onClick={() => setCurrentTabs("CONTENT")}
                type={currentTabs === "CONTENT" && "primary"}
              >
                Content
              </Button>
            </div>
          </div>
        </div>
        {currentTabs === "PROJECTDETAILS" && (
          <div className="mt-10">
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Title</label>
              <input
                value={projectVariables.title}
                onChange={(e) =>
                  setProjectVariables({ ...projectVariables, title: e.target.value })
                }
                className="w-full mt-2 p-4 border hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>

            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Tagline</label>
              <input
                value={projectVariables.tagline}
                onChange={(e) =>
                  setProjectVariables({
                    ...projectVariables,
                    tagline: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 border hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">preview (SEO)</label>
              <textarea
                value={projectVariables.preview}
                onChange={(e) =>
                  setProjectVariables({
                    ...projectVariables,
                    preview: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 border hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              ></textarea>
            </div>
            <div className="mt-5 flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Image</label>
              <input
                value={projectVariables.image}
                onChange={(e) =>
                  setProjectVariables({
                    ...projectVariables,
                    image: e.target.value,
                  })
                }
                className="w-full mt-2 p-4 border hover:border-blue-400 rounded-md shadow-lg border-2"
                type="text"
              ></input>
            </div>
          </div>
        )}

        {currentTabs === "CONTENT" && (
          <div className="mt-10">
            <div className="flex flex-col items-center">
              <label className="w-full text-sx opacity-50">Content</label>
              <TextareaAutosize
                className="w-full h-auto mt-5 p-4 border hover:border-blue-400 rounded-xl shadow-xl"
                value={projectContent}
                onChange={(e) => setProjectContent(e.target.value)}
              ></TextareaAutosize>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectEditor;
