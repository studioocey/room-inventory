const inventory = [
    { name: "Gold Washi Tape", x: 120, y: 200 },
    { name: "Pink Stickers", x: 300, y: 150 },
    { name: "Glue Gun", x: 400, y: 280 },
    { name: "Acrylic Paint Set", x: 600, y: 320 },
    // Add your items here!
  ];
  
  const searchBar = document.getElementById('searchBar');
  const marker = document.getElementById('marker');
  
  searchBar.addEventListener('input', function() {
    const query = searchBar.value.toLowerCase();
    const foundItem = inventory.find(item => item.name.toLowerCase().includes(query));
    
    if (foundItem) {
      marker.style.left = `${foundItem.x}px`;
      marker.style.top = `${foundItem.y}px`;
      marker.style.display = 'block';
    } else {
      marker.style.display = 'none';
    }
  });
