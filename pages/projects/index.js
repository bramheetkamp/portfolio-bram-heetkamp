import { useRef, useState, useEffect } from "react";
import { getAllProjects } from "../../utils/api";
import Header from "../../components/Header";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Cursor from "../../components/Cursor";

const Project = ({ projects }) => {
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createProject = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        setOpen(false);
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  const deleteProject = (slug) => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/project", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
        }),
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  return (
    <div className={"relative"}>
      <Head>
        <title>Work</title>
      </Head>

      <div className="gradient-circle"></div>
      <Cursor />
      <div className="container mx-auto mt-10 cursor-none">
        <Header isHome={true}></Header>
        <div className="mt-10">
          <h1
            ref={text}
            className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
          >
            Work.
          </h1>
          <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
            {projects &&
              projects.map((project) => (
                <div
                  className="cursor-pointer relative"
                  key={project.slug}
                  onClick={() => Router.push(`/projects/${project.slug}`)}
                >
                  <img
                    className="w-full h-60 rounded-lg shadow-lg object-cover"
                    src={project.image}
                    alt={project.title}
                  ></img>
                  <h2 className="mt-5 text-4xl">{project.title}</h2>
                  <p className="mt-2 opacity-50 text-lg">{project.preview}</p>
                  {process.env.NODE_ENV === "development" && (
                    <div className="absolute top-0 right-0">
                      <Button
                        onClick={(e) => {
                          deleteProject(project.slug);
                          e.stopPropagation();
                        }}
                        type={"primary"}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={createProject} type={"primary"}>
            Add New PoProjectst +{" "}
          </Button>
        </div>
      )}
    </div>
  );
};

export async function getStaticProps() {
  const projects = getAllProjects([
    "slug",
    "title",
    "image",
    "preview",
    "author",
  ]);

  return {
    props: {
      projects: [...projects],
    },
  };
}

export default Project;
