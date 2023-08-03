import React, { useRef, useState } from "react";
import { getProjectBySlug, getAllProjects } from "../../utils/api";
import Header from "../../components/Header";
import ContentSection from "../../components/ContentSection";
import Footer from "../../components/Footer";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import ProjectEditor from "../../components/ProjectEditor";
import { useRouter } from "next/router";
import Cursor from "../../components/Cursor";

const ProjectPage = ({ project }) => {
  const [showEditor, setShowEditor] = useState(false);
  const textOne = useRef();
  const textTwo = useRef();
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    stagger([textOne.current, textTwo.current], { y: 30 }, { y: 0 });
  }, []);

  return (
    <div className={"relative"}>
      <Head>
        <title>{"Project - " + project.title}</title>
        <meta name="description" content={project.preview} />
      </Head>

      <div className="gradient-circle"></div>
      <Cursor />
      <div className="container mx-auto mt-10 cursor-none">
        <Header isHome/>
        <div className="mt-10 flex flex-col">
          <img
            className="w-full h-96 rounded-lg shadow-lg object-cover"
            src={project.image}
          ></img>
          <h1
            ref={textOne}
            className="mt-10 text-4xl mob:text-2xl laptop:text-6xl text-bold"
          >
            {project.title}
          </h1>
          <h2
            ref={textTwo}
            className="mt-2 text-xl max-w-4xl text-darkgray opacity-50"
          >
            {project.tagline}
          </h2>
        </div>
        <ContentSection content={project.content}></ContentSection>
        <Footer />
      </div>
      {process.env.NODE_ENV === "development" && (
        <div className="fixed bottom-6 right-6">
          <Button onClick={() => setShowEditor(true)} type={"primary"}>
            Edit this project
          </Button>
        </div>
      )}

      {showEditor && (
        <ProjectEditor
          project={project}
          close={() => setShowEditor(false)}
          refresh={() => router.reload(window.location.pathname)}
        />
      )}
    </div>
  );
};

export async function getStaticProps({ params }) {
  const project = getProjectBySlug(params.slug, [
    "slug",
    "preview",
    "title",
    "tagline",
    "preview",
    "image",
    "content",
  ]);

  return {
    props: {
      project: {
        ...project,
      },
    },
  };
}

export async function getStaticPaths() {
  const projects = getAllProjects(["slug"]);

  return {
    paths: projects.map((project) => {
      return {
        params: {
          slug: project.slug,
        },
      };
    }),
    fallback: false,
  };
}

export default ProjectPage;
