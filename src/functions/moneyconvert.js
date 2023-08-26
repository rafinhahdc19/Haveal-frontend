const FormatCurrency = (value) => {
    const numberFormat = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  
    return numberFormat.format(value);
  };

export default FormatCurrency