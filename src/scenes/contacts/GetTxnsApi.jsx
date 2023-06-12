export const fetchContacts = async () => {
    try {
      const response = await fetch('http://localhost:9050/v0.1/tara/pgrouter/txn-dashboard');
      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };