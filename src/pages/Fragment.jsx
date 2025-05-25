import { useState, useEffect } from 'react';
import NewButton from "./composants/NewButton";
import FragmentCode from './composants/FragmentCode';
import uniqid from 'uniqid';

export default function Fragment() {
  const [fragments, setFragments] = useState(() => {
    const storedFragments = localStorage.getItem('fragments');
    if (storedFragments) {
      try {
        const parsedFragments = JSON.parse(storedFragments);
        if (Array.isArray(parsedFragments)) {
          return parsedFragments; // affichage des fragments
        }
      } catch (error) {
        console.error("Erreur lors du parsing des fragments :", error);
      }
    }
    return [];
  });

  useEffect(() => {
    console.log("Sauvegarde dans localStorage :", fragments);
    localStorage.setItem('fragments', JSON.stringify(fragments));
  }, [fragments]); // ce useEffect agis comme un écouteur d'événement et met à jour le localStorage à chaque fois que le state "fragments" change

  const handleFormSubmit = (newFragment) => {
    console.log("Fragment reçu :", newFragment);

    const tagsWithIds = newFragment.tags.map(tag => ({
      id: uniqid(),
      label: tag.trim()
    }));

    const fragmentWithId = { ...newFragment, tags: tagsWithIds, id: uniqid() };
    setFragments(prev => [...prev, fragmentWithId]); // ajout du nouveau fragment
  };

  const handleDelete = (idToDelete) => {
    const updatedFragments = fragments.filter(frag => frag.id !== idToDelete);
    setFragments(updatedFragments);
    localStorage.setItem('fragments', JSON.stringify(updatedFragments));
  }; // la supression d'un fragment prend en paramètre le uniqid du fragment à supprimer, puis filtre les fragments pour ne garder que ceux dont l'id ne correspond pas à celui à supprimer. Enfin, on met à jour le state et le localStorage.

  return (
    <>
      <br /><br /><br />
      <NewButton onFormSubmit={handleFormSubmit} />

      {fragments.map((fragment) => (
  <FragmentCode
    fragmentId={fragment.id}
  title={fragment.title}
  tags={fragment.tags}
    onDelete={() => handleDelete(fragment.id)}
  />
))}
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
    </>
  );
}