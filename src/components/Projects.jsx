import { useFetchProjects } from '../fetchProjects';

export default function Projects() {
  const { loading, projects } = useFetchProjects();

  if (loading) {
    return (
      <section className="projects">
        <div className="projects-center">
          <div className="title">Loading . . .</div>
        </div>
      </section>
    );
  }

  const projectsMapping = projects.map((project) => {
    const { id, url, img, title } = project;
    return (
      <div className="project" key={id}>
        <a href={url}>
          <img src={img} alt={title} className="img" />
        </a>
        <h5>{title}</h5>
      </div>
    );
  });

  return (
    <section className="projects">
      <h2 className="title">projects</h2>
      <div className="title-underline"></div>
      <div className="projects-center">{projectsMapping}</div>
    </section>
  );
}
