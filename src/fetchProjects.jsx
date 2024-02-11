import { useState, useEffect } from 'react';
import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.VITE_SPACE_ID,
  environment: 'master',
  accessToken: import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN,
});

export const useFetchProjects = () => {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);

  const getData = async () => {
    try {
      const response = await client.getEntries({ content_type: 'projects' });
      const data = response.items.map((item) => {
        // parsing
        const { id } = item.sys;
        const { title, url, image } = item.fields;
        const img = image?.fields?.file?.url;

        return { title, url, id, img };
      });
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return { loading, projects };
};
