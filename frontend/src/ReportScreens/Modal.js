import React, { useState } from 'react';
import ReactModal from 'react-modal';

const customStyles = {
  content: {
    width: '50%',
    height: '50%',
    margin: 'auto',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '5px',
    display: 'flex',
    flexDirection: 'column',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '40px',
    cursor: 'pointer',
    fontSize: '24px',
    color: 'red',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
  },
  arrow: {
    marginRight: '10px',
    cursor: 'pointer',
    marginBottom:"10px"
  },
};

function CardModal({ isOpen, closeModal, data, head }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
 const[category,setCategory]=useState(null);
  const handleProductDetailsClick = (product,base) => {
    console.log(product)
    setSelectedProduct(product);
    setCategory(base);
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <div style={customStyles.closeButton} onClick={closeModal}>
        <span>&times;</span>
      </div>
      
      {selectedProduct ? (<>
        <div style={customStyles.heading}>
        <span style={customStyles.arrow} onClick={()=>{setSelectedProduct(data)}}>&larr;</span>
        <h3 style={{ fontWeight: 'bold' }}>{head}</h3></div>
        <h4>{head}/{category}</h4>
         <table style={{ width: '100%' }}>
         <thead style={{ width: '100%', backgroundColor: '#DDE6ED', color: 'black' }}>
           <tr>
             <th>Product Name</th>
             <th>Product</th>
             <th>Amount</th>
             
           </tr>
         </thead>
         <tbody style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
           {selectedProduct.map((item) => (
             <tr>
               <td>{item.product_name}</td>
               <td style={{ color: 'green' }}>{item.product}</td>
               <td style={{ color: 'green' }}>{item.amount}</td>
               <td>
                 <button >&rarr;</button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>

       
     </> ) : (<>
      <h3 style={{ fontWeight: 'bold' }}>{head}</h3>
        <table style={{ width: '100%' }}>
          <thead style={{ width: '100%', backgroundColor: '#DDE6ED', color: 'black' }}>
            <tr>
              <th>Product</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody style={{ width: '100%', textAlign: 'center', marginTop: '10px' }}>
            {data.map((item) => (
              <tr key={item.id}>
                <td>{item.sub_detail_category}</td>
                <td style={{ color: 'green' }}>{item.total_amount}</td>
                <td>
                  <button onClick={() => handleProductDetailsClick(item.product_details,item.sub_detail_category)}>&rarr;</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
     </> )}
    </ReactModal>
  );
}

export default CardModal;
