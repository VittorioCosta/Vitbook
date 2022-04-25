export default function formatDate(date) {
    return new Intl.DateTimeFormat().format(new Date(date));
  }
  

  