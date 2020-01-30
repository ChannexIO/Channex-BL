export default function(data = []) {
  return data.map(({ attributes }) => attributes);
}