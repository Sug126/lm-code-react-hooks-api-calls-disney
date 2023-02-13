import { useContext } from "react";
import { FavouritesContext } from "../App";
import { DisneyCharacter } from "../disney_character";
interface CharacterProps {
  character: DisneyCharacter;
  updateFavourites: (favourites: Array<DisneyCharacter>) => void;
}

const Character: React.FC<CharacterProps> = ({
  character,
  updateFavourites,
}) => {
  const characterFavourites = useContext(FavouritesContext);
  // Define a default in case the character doesn't have an image
  let imageSrc = "https://picsum.photos/300/200/?blur";
  if (character.imageUrl) {
    // API seems to include extra path for images so here we strip it off to fetch raw image
    if (character.imageUrl.includes("/revision"))
      imageSrc = character.imageUrl.substring(
        0,
        character.imageUrl.indexOf("/revision")
      );
    else {
      imageSrc = character.imageUrl;
    }
  }

  function isFavorite(characterId: number) {
    return characterFavourites.some(character => character._id === characterId);
  }

  function toggleFavouriteForCharacter(characterId: number) {
    if (!isFavorite(characterId)) {
      // add to favourites
      updateFavourites([...characterFavourites, character]);
    } else {
      // remove from favourites
      const updatedFavourites = characterFavourites.filter(
        character => character._id !== characterId
      );
      updateFavourites(updatedFavourites);
    }
  }

  return (
    <article className="character-item">
      <h2>{character.name}</h2>

      <div
        className="character-item__actions"
        onClick={() => toggleFavouriteForCharacter(character._id)}
      >
        {!isFavorite(character._id) ? "Add to Favourites" : "Favourited"}
      </div>

      <img
        className="character-item__img"
        src={imageSrc}
        alt={character.name}
      />
    </article>
  );
};

export default Character;