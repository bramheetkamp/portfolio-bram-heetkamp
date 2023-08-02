import { useRef, useState } from "react";
import { getAllProjects } from "../../utils/api";
import Header from "../../components/Header";
import Router, { useRouter } from "next/router";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../../utils";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const Project = ({ projects }) => {
  const text = useRef();
  const router = useRouter();

  useIsomorphicLayoutEffect(() => {
    stagger([text.current], { y: 30 }, { y: 0 });
  }, []);

  const createProject = (slug) => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
        }),
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

  const [open, setOpen] = useState(false);
  const [projectSlug, setProjectSlug] = useState('');
  const handleClickOpen = () => { setOpen(true); };
  const handleClose = () => { setOpen(false); };

  return (
    <>
      <Head>
        <title>Work</title>
      </Head>
      <div className="container mx-auto mb-10">
        <Header></Header>
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
                  onClick={() => Router.push(`/project/${project.slug}`)}
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
          <Button onClick={handleClickOpen} type={"primary"}>
            Add New Project +{" "}
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New project</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="project"
                label="Project Slug"
                type="text"
                fullWidth
                variant="standard"
                value={projectSlug}
                onChange={(event) => {setProjectSlug(event.target.value)}}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose} type={"primary"}>Cancel</Button>
              <Button onClick={() => createProject(projectSlug)} type={"primary"}>Create</Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
    </>
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
