interface TagsListProps {
  tags: string[];
  tagClassName?: string;
}

export const TagsList: React.FC<TagsListProps> = ({ tags, tagClassName }) => {
  return (
    <ul className="flex flex-col sm:flex-row flex-wrap">
      {tags.map((c, i) => (
        <li key={`${c}-${i}`}>
          <p className={`fr-tag ${tagClassName}`}>{c}</p>
        </li>
      ))}
    </ul>
  );
};
