export default function Stats({ items }) {
    const totalItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;
    const percentage = totalItems ? (packedItems / totalItems) * 100 : 0;
  
    return (
      <footer className="stats">
        {percentage === 100 ? (
          <em>You got everything!✈🗽🗼🏖️🏝️🏜️🎑🏞️🌅🌄🌠🎇🎆🌇🌆🏙️🌃🌌🌉🌁</em>
        ) : (
          <em>
            You have {totalItems} items in the list. You already packed {packedItems} ({percentage.toFixed(2)}%).
          </em>
        )}
      </footer>
    );
  }