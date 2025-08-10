// Main Application Logic
let token;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    // Create a new token instance
    token = new FungibleToken("InternToken", "INT", 0);
    
    // Initialize the UI
    updateStats();
    updateExplorer();
    updateTransactionHistory();
    
    // Set up search functionality
    document.getElementById('searchAddress').addEventListener('input', function(e) {
        if (e.target.value === '') {
            updateExplorer();
        }
    });
});

// Update statistics display
function updateStats() {
    const info = token.getTokenInfo();
    
    document.getElementById('totalSupply').textContent = FungibleToken.formatNumber(info.totalSupply);
    document.getElementById('totalHolders').textContent = info.totalHolders;
    document.getElementById('circulating').textContent = FungibleToken.formatNumber(info.circulatingSupply);
}

// Mint new tokens
function mintTokens() {
    const address = document.getElementById('mintAddress').value.trim();
    const amount = parseInt(document.getElementById('mintAmount').value);
    
    if (!address) {
        showNotification('Please enter a valid address', 'error');
        return;
    }
    
    if (!amount || amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    // Generate address if not in correct format
    let targetAddress = address;
    if (!token.isValidAddress(address)) {
        targetAddress = generateFriendlyAddress(address);
    }
    
    try {
        const transaction = token.mint(targetAddress, amount);
        showNotification(`Successfully minted ${amount} tokens to ${FungibleToken.formatAddress(targetAddress)}`, 'success');
        
        // Clear inputs
        document.getElementById('mintAddress').value = '';
        document.getElementById('mintAmount').value = '';
        
        // Update UI
        updateStats();
        updateExplorer();
        updateTransactionHistory();
        
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    }
}

// Transfer tokens between addresses
function transferTokens() {
    const fromAddress = document.getElementById('fromAddress').value.trim();
    const toAddress = document.getElementById('toAddress').value.trim();
    const amount = parseInt(document.getElementById('transferAmount').value);
    
    if (!fromAddress || !toAddress) {
        showNotification('Please enter valid addresses', 'error');
        return;
    }
    
    if (!amount || amount <= 0) {
        showNotification('Please enter a valid amount', 'error');
        return;
    }
    
    // Generate addresses if not in correct format
    let fromAddr = token.isValidAddress(fromAddress) ? fromAddress : generateFriendlyAddress(fromAddress);
    let toAddr = token.isValidAddress(toAddress) ? toAddress : generateFriendlyAddress(toAddress);
    
    try {
        const transaction = token.transfer(fromAddr, toAddr, amount);
        showNotification(`Successfully transferred ${amount} tokens from ${FungibleToken.formatAddress(fromAddr)} to ${FungibleToken.formatAddress(toAddr)}`, 'success');
        
        // Clear inputs
        document.getElementById('fromAddress').value = '';
        document.getElementById('toAddress').value = '';
        document.getElementById('transferAmount').value = '';
        
        // Update UI
        updateStats();
        updateExplorer();
        updateTransactionHistory();
        
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    }
}

// Check balance of an address
function checkBalance() {
    const address = document.getElementById('balanceAddress').value.trim();
    const resultDiv = document.getElementById('balanceResult');
    
    if (!address) {
        resultDiv.innerHTML = '<div class="error">Please enter an address</div>';
        return;
    }
    
    // Generate address if not in correct format
    let targetAddress = token.isValidAddress(address) ? address : generateFriendlyAddress(address);
    
    try {
        const balance = token.balanceOf(targetAddress);
        const percentage = token.totalSupply > 0 ? ((balance / token.totalSupply) * 100).toFixed(4) : 0;
        
        resultDiv.innerHTML = `
            <div class="success">
                <strong>Address:</strong> <span class="address">${FungibleToken.formatAddress(targetAddress)}</span><br>
                <strong>Balance:</strong> ${FungibleToken.formatNumber(balance)} INT<br>
                <strong>Percentage:</strong> ${percentage}% of total supply
            </div>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<div class="error">Error: ${error.message}</div>`;
    }
}

// Update the token explorer table
function updateExplorer() {
    const holders = token.getAllHolders();
    const tableBody = document.getElementById('holdersTableBody');
    
    if (holders.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #666;">No token holders found</td></tr>';
        return;
    }
    
    tableBody.innerHTML = holders.map(holder => `
        <tr>
            <td><strong>#${holder.rank}</strong></td>
            <td><span class="address">${FungibleToken.formatAddress(holder.address)}</span></td>
            <td><strong>${FungibleToken.formatNumber(holder.balance)} INT</strong></td>
            <td><span class="percentage">${holder.percentage}%</span></td>
            <td>
                <button class="btn btn-danger" onclick="burnTokens('${holder.address}')">Burn</button>
            </td>
        </tr>
    `).join('');
}

// Refresh explorer data
function refreshExplorer() {
    updateExplorer();
    showNotification('Explorer data refreshed', 'info');
}

// Search for specific user
function searchUser() {
    const searchTerm = document.getElementById('searchAddress').value.trim();
    
    if (!searchTerm) {
        updateExplorer();
        return;
    }
    
    const results = token.searchHolder(searchTerm);
    const tableBody = document.getElementById('holdersTableBody');
    
    if (results.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" style="text-align: center; color: #666;">No matching addresses found</td></tr>';
        return;
    }
    
    tableBody.innerHTML = results.map(holder => `
        <tr>
            <td><strong>#${holder.rank}</strong></td>
            <td><span class="address">${FungibleToken.formatAddress(holder.address)}</span></td>
            <td><strong>${FungibleToken.formatNumber(holder.balance)} INT</strong></td>
            <td><span class="percentage">${holder.percentage}%</span></td>
            <td>
                <button class="btn btn-danger" onclick="burnTokens('${holder.address}')">Burn</button>
            </td>
        </tr>
    `).join('');
}

// Burn tokens from an address
function burnTokens(address) {
    const amount = prompt(`How many tokens would you like to burn from ${FungibleToken.formatAddress(address)}?`);
    
    if (!amount || isNaN(amount) || parseInt(amount) <= 0) {
        showNotification('Invalid amount entered', 'error');
        return;
    }
    
    try {
        const transaction = token.burn(address, parseInt(amount));
        showNotification(`Successfully burned ${amount} tokens from ${FungibleToken.formatAddress(address)}`, 'success');
        
        // Update UI
        updateStats();
        updateExplorer();
        updateTransactionHistory();
        
    } catch (error) {
        showNotification(`Error: ${error.message}`, 'error');
    }
}

// Update transaction history display
function updateTransactionHistory() {
    const transactions = token.getTransactionHistory(20);
    const transactionList = document.getElementById('transactionList');
    
    if (transactions.length === 0) {
        transactionList.innerHTML = '<div style="text-align: center; color: #666; padding: 20px;">No transactions found</div>';
        return;
    }
    
    transactionList.innerHTML = transactions.map(tx => {
        let description = '';
        let typeClass = '';
        
        switch (tx.type) {
            case 'mint':
                description = `Minted ${FungibleToken.formatNumber(tx.amount)} INT to ${FungibleToken.formatAddress(tx.to)}`;
                typeClass = 'success';
                break;
            case 'transfer':
                description = `Transferred ${FungibleToken.formatNumber(tx.amount)} INT from ${FungibleToken.formatAddress(tx.from)} to ${FungibleToken.formatAddress(tx.to)}`;
                typeClass = 'info';
                break;
            case 'burn':
                description = `Burned ${FungibleToken.formatNumber(tx.amount)} INT from ${FungibleToken.formatAddress(tx.from)}`;
                typeClass = 'error';
                break;
        }
        
        return `
            <div class="transaction-item">
                <div class="transaction-type ${typeClass}">${tx.type.toUpperCase()}</div>
                <div>${description}</div>
                <div class="transaction-time">${FungibleToken.formatTime(tx.timestamp)}</div>
                <div style="font-size: 0.8rem; color: #666; font-family: monospace;">Hash: ${tx.hash.slice(0, 20)}...</div>
            </div>
        `;
    }).join('');
}

// Show notification to user
function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = `notification ${type}`;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 4000);
}

// Generate a friendly address from a simple name
function generateFriendlyAddress(name) {
    // Create a deterministic address based on the name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        const char = name.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Convert to hex and pad to 40 characters
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    const address = '0x' + hex.repeat(5).slice(0, 40);
    
    return address;
}

// Add some utility functions for demo purposes
function addDemoUser() {
    const demoUsers = [
        'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry'
    ];
    
    const randomUser = demoUsers[Math.floor(Math.random() * demoUsers.length)];
    const randomAmount = Math.floor(Math.random() * 10000) + 1000;
    
    document.getElementById('mintAddress').value = randomUser;
    document.getElementById('mintAmount').value = randomAmount;
}

function clearAllData() {
    if (confirm('Are you sure you want to clear all token data? This cannot be undone.')) {
        token = new FungibleToken("InternToken", "INT", 0);
        updateStats();
        updateExplorer();
        updateTransactionHistory();
        showNotification('All data cleared', 'info');
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'Enter') {
        // Quick mint with Ctrl+Enter
        if (document.activeElement.id === 'mintAmount') {
            mintTokens();
        }
    }
});
