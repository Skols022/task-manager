export const remapCollaboratorsFroSelect = (
  { data = [] }:
    { data: Array<{ id: string, name: string, email: string }> }
) => {
  return (data || []).
    map(({ id, name, email }) => ({ value: id, label: name, email })) || [];
}