import React, { Component } from 'react';
import './style.css';

class BankTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      banksPerPage: 8,
    };
  }

  
  handleClick = (event) => {
   
    this.setState({
      currentPage: Number(event.target.id),
    });
  };
  handleClick1=(event)=>{
    this.setState({
        currentPage: Number(this.state.currentPage)+1,
      });
   
  }
  handleClick2=(event)=>{
    this.setState({
        currentPage: Number(this.state.currentPage)-1,
      });
  }
  render() {
    const { currentPage, banksPerPage } = this.state;
    const { data } = this.props;
    
    const banks=data.web_result
    

    const indexOfLastBank = currentPage * banksPerPage;
    const indexOfFirstBank = indexOfLastBank - banksPerPage;
    const currentBanks = banks ? banks.slice(indexOfFirstBank, indexOfLastBank) : [];


    const pageNumbers = banks
  ? Array.from({ length: Math.ceil(banks.length / banksPerPage) }, (_, i) => i + 1)
  : [];

    return (
      <div className='main'>
        <table style={{ width: '50%' }}>
          <thead>
            <tr style={{backgroundColor:"#96B6C5",paddingBottom:"10px"}}>
              <th style={{paddingTop:"10px",paddingBottom:"6px"}}>Bank</th>
            </tr>
          </thead>
          <tbody style={{ textAlign: 'center' }}>
            {currentBanks.map((bank) => (
              <tr  style={{backgroundColor:"#DDE6ED"}}>
                <td className='bank-head'>{bank.other_bank_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='bank-table-container'>
          <table className='bank-info-scrollable'>
            <thead>
              <tr style={{backgroundColor:"#DDE6ED"}}>
                <th className='infohead'>HEAD OFFICE APEX</th>
                <th className='infohead'>SHARDA CHOWCK</th>
                <th className='infohead'>Pandri</th>
                <th className='infohead'>Bhilai</th>
                <th className='infohead'>Bilaspur</th>
                <th className='infohead'>RAIGARH</th>
                <th className='infohead'>Pussore</th>
                <th className='infohead'>BARAMKELA</th>
                <th className='infohead'>DHARAMJAYGARH</th>
                  <th className='infohead'>Sarangarh (EJ)</th>
                    <th className='infohead'>KHARSIYA(EJ)</th>
                    <th className='infohead'>Pathalgaon</th>
                    <th className='infohead'>Jashpur</th>
                    <th className='infohead'>Lailunga</th>
                    <th className='infohead'>Kunkuri</th>
                    <th className='infohead'>Mobile Banking</th>
              </tr>
            </thead>
            <tbody>
              {currentBanks.map((bank) => (
                <tr >
                  <td className='bank-info'>{bank.branch[0]["HEAD OFFICE APEX"]}</td>
                  <td className='bank-info'>{bank.branch[0]["SHARDA CHOWCK"]}</td>
                  <td className='bank-info'>{bank.branch[0]["Pandri"]}</td>
                  <td className='bank-info'>{bank.branch[0]["Bhilai"]}</td>
                  <td className='bank-info'>{bank.branch[0]["Bilaspur"]}</td>
                  <td className='bank-info'>{bank.branch[0]["RAIGARH"]}</td>
                  <td className='bank-info'>{bank.branch[0]["Pussore"]}</td>
                  <td className='bank-info'>{bank.branch[0]["BARAMKELA"]}</td>
                  <td className='bank-info'>{bank.branch[0]["DHARAMJAYGARH"]}</td>
                  <td className='bank-info'>{bank.branch[0]["Sarangarh (EJ)"]}</td>
                  <td className='bank-info'>{bank.branch[0]["KHARSIYA(EJ)"]}</td>
                  <td className='bank-info'>{bank.branch[0]["Pathalgaon"]}</td>
                  <td className='bank-info'>{bank.branch[0]["Jashpur"]}</td>
                  <td className='bank-info'>{bank.branch[0]["Lailunga"]}</td>
                  <td className='bank-info'>{bank.branch[0]["Kunkuri"]}</td>
                  <td className='bank-info'>{bank.branch[0]["Mobile Banking"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className='pagination'>
            {currentPage > 1 && (
              <span id='prev' onClick={this.handleClick2}>
                {'<< '}
              </span>
            )}
            {pageNumbers.map((number) => (
              <span
                key={number}
                id={number}
                onClick={this.handleClick}
                className={number === currentPage ? 'active' : 'nonactive'}
               
              >
                {number}
              </span>
            ))}
            {currentPage < pageNumbers.length && (
              <span id='next' onClick={this.handleClick1}>
                {' >>'}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default BankTable;
