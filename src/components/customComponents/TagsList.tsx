interface TagsListProps {
  tags: string[];
}

export const TagsList: React.FC<TagsListProps> = ({ tags }) => {
  return (
    <ul className="flex flex-col sm:flex-row flex-wrap">
      {tags.map((c, i) => (
        <li key={`${c}-${i}`}>
          <p className="fr-tag">{c}</p>
        </li>
      ))}
    </ul>
  );
};
