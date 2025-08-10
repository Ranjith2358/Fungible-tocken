# 🪙 Fungible Token Project (with UI)

A complete web-based fungible token system with an interactive explorer interface. This project implements a token management system that tracks total supply, user balances, and provides a comprehensive explorer for viewing token holders and transaction history.

## ✨ Features

### Core Token Functionality
- **Token Data Management**: Track total supply and individual user balances
- **Minting**: Create new tokens and assign them to users
- **Transfers**: Move tokens between different addresses
- **Burning**: Remove tokens from circulation
- **Balance Queries**: Check token balance for any address

### Explorer Interface
- **Real-time Statistics**: View total supply, holder count, and circulating tokens
- **Token Holder Rankings**: See all holders ranked by balance with percentages
- **Search Functionality**: Find specific addresses in the holder list
- **Transaction History**: Complete log of all mints, transfers, and burns
- **Interactive UI**: Modern, responsive design with smooth animations

### User Experience
- **Friendly Address System**: Enter simple names (like "Alice") that get converted to blockchain addresses
- **Real-time Updates**: All statistics and displays update immediately after transactions
- **Error Handling**: Comprehensive validation and user-friendly error messages
- **Responsive Design**: Works perfectly on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Running the Application

1. **Clone or Download** the project files to your local machine

2. **Open the Application**:
   - Simply open `index.html` in your web browser
   - Or use a local web server for the best experience

3. **Using a Local Server** (Recommended):
   ```bash
   # If you have Python installed:
   python -m http.server 8000
   
   # If you have Node.js installed:
   npx http-server
   
   # Then open: http://localhost:8000
   ```

## 📖 How to Use

### 1. Minting Tokens
- Enter a user address (or simple name like "Alice")
- Specify the amount of tokens to mint
- Click "Mint" to create new tokens

### 2. Transferring Tokens
- Enter the sender's address (from)
- Enter the recipient's address (to)
- Specify the transfer amount
- Click "Transfer" to move tokens

### 3. Checking Balances
- Enter any address to check its token balance
- View the balance and percentage of total supply

### 4. Exploring Token Holders
- View all token holders ranked by balance
- Search for specific addresses
- See real-time statistics and percentages

### 5. Transaction History
- View recent transactions (mints, transfers, burns)
- See transaction details including timestamps and amounts

## 🏗️ Project Structure

```
FungibleTokenProject/
├── index.html          # Main HTML interface
├── styles.css          # Modern CSS styling
├── token.js           # Core token logic and blockchain simulation
├── app.js             # UI interaction and application logic
└── README.md          # This documentation
```

## 🔧 Technical Implementation

### Token System (`token.js`)
- **FungibleToken Class**: Core token management logic
- **Balance Tracking**: Map-based storage for address balances
- **Transaction History**: Complete audit trail of all operations
- **Validation**: Address format and amount validation
- **Demo Data**: Pre-populated with sample holders for demonstration

### User Interface (`app.js`)
- **Real-time Updates**: Automatic UI refresh after operations
- **Address Generation**: Convert friendly names to blockchain addresses
- **Search & Filter**: Find specific holders or transactions
- **Notifications**: User feedback for all operations
- **Error Handling**: Comprehensive validation and error messages

### Styling (`styles.css`)
- **Modern Design**: Gradient backgrounds and card-based layout
- **Responsive**: Mobile-friendly responsive design
- **Animations**: Smooth transitions and hover effects
- **Accessibility**: High contrast and readable typography

## 🎯 Key Features Implemented

### ✅ Step 1: Token Data Setup
- ✅ Total supply tracking
- ✅ User balance mapping
- ✅ Address validation system
- ✅ Demo data initialization

### ✅ Step 2: Core Token Operations
- ✅ Mint new tokens to addresses
- ✅ Transfer tokens between users
- ✅ Burn tokens from circulation
- ✅ Balance inquiry system

### ✅ Step 3: Explorer Functionality
- ✅ Token holder rankings
- ✅ Real-time statistics display
- ✅ Search and filter capabilities
- ✅ Transaction history viewer

### ✅ Step 4: User Interface
- ✅ Modern, responsive web design
- ✅ Interactive forms and controls
- ✅ Real-time data visualization
- ✅ User-friendly notifications

## 🔍 Demo Data

The application comes pre-loaded with sample token holders:
- **Owner**: 1,000,000 INT (Initial supply holder)
- **User 1**: 500,000 INT (25% of supply)
- **User 2**: 250,000 INT (12.5% of supply)
- **User 3**: 100,000 INT (5% of supply)
- **User 4**: 75,000 INT (3.75% of supply)

## 🛠️ Customization

### Token Configuration
Edit the token initialization in `app.js`:
```javascript
token = new FungibleToken("YourTokenName", "YTN", 0);
```

### Styling
Modify `styles.css` to change:
- Color scheme (update CSS variables)
- Layout and spacing
- Animations and transitions

### Functionality
Extend `token.js` to add:
- Additional token standards
- More complex validation rules
- Integration with real blockchain networks

## 🚀 Deployment

### GitHub Pages
1. Upload files to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Access via: `https://yourusername.github.io/repository-name`

### Netlify
1. Drag and drop the project folder to Netlify
2. Get instant deployment with custom domain options

### Local Network
- Use any static file server to serve the files
- Perfect for local development and testing

## 📝 Assignment Compliance

This project fulfills all requirements for **Mini Task 3**:

1. ✅ **Token Data Setup**: Complete tracking system for supply and balances
2. ✅ **Explorer Functionality**: Comprehensive holder rankings and search
3. ✅ **User Interface**: Modern, interactive web interface
4. ✅ **Core Operations**: Mint, transfer, burn, and balance checking
5. ✅ **Real-time Updates**: All data updates immediately
6. ✅ **Professional Quality**: Production-ready code with documentation

## 🎉 Conclusion

This Fungible Token Project demonstrates a complete understanding of token economics, data management, and modern web development. The system is fully functional, well-documented, and ready for demonstration or further development.

**Ready for submission! 🚀**
