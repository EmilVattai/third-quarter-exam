function findPartner(customer, candidates) {
  const foundCandidates = candidates.filter(candidate => {
    return candidate.favoriteGenre === customer.favoriteGenre && 
      candidate.hobbies.some(hobby => customer.hobbies.includes(hobby)); 
  });
  if (foundCandidates.length === 0) {
    return null;
  } else {
    const sortedCandidates = foundCandidates.sort((a, b) => a.age - b.age);
    return sortedCandidates[0];
  }
}

module.exports = findPartner