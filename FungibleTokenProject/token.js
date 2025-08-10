// Fungible Token System - Core Logic
class FungibleToken {
    constructor(name = "MyToken", symbol = "MTK", initialSupply = 0) {
        this.name = name;
        this.symbol = symbol;
        this.totalSupply = initialSupply;
        this.balances = new Map(); // address -> balance
        this.transactions = [];
        this.owner = "0x1234567890123456789012345678901234567890"; // Contract owner
        
        // Initialize with some demo data
        this.initializeDemoData();
    }

    initializeDemoData() {
        // Add some initial holders for demonstration
        const demoHolders = [
            { address: "0x1234567890123456789012345678901234567890", balance: 1000000 },
            { address: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd", balance: 500000 },
            { address: "0x9876543210987654321098765432109876543210", balance: 250000 },
            { address: "0xfedcbafedcbafedcbafedcbafedcbafedcbafed", balance: 100000 },
            { address: "0x1111111111111111111111111111111111111111", balance: 75000 }
        ];

        demoHolders.forEach(holder => {
            this.balances.set(holder.address, holder.balance);
            this.totalSupply += holder.balance;
            this.transactions.push({
                type: 'mint',
                from: null,
                to: holder.address,
                amount: holder.balance,
                timestamp: new Date(Date.now() - Math.random() * 86400000 * 7), // Random time in last week
                hash: this.generateTxHash()
            });
        });
    }

    generateTxHash() {
        return '0x' + Math.random().toString(16).substr(2, 64);
    }

    generateAddress() {
        return '0x' + Math.random().toString(16).substr(2, 40);
    }

    isValidAddress(address) {
        return /^0x[a-fA-F0-9]{40}$/.test(address);
    }

    mint(to, amount) {
        if (!this.isValidAddress(to)) {
            throw new Error('Invalid address format');
        }
        
        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }

        const currentBalance = this.balances.get(to) || 0;
        this.balances.set(to, currentBalance + amount);
        this.totalSupply += amount;

        const transaction = {
            type: 'mint',
            from: null,
            to: to,
            amount: amount,
            timestamp: new Date(),
            hash: this.generateTxHash()
        };

        this.transactions.unshift(transaction);
        return transaction;
    }

    transfer(from, to, amount) {
        if (!this.isValidAddress(from) || !this.isValidAddress(to)) {
            throw new Error('Invalid address format');
        }

        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }

        const fromBalance = this.balances.get(from) || 0;
        if (fromBalance < amount) {
            throw new Error('Insufficient balance');
        }

        const toBalance = this.balances.get(to) || 0;
        
        this.balances.set(from, fromBalance - amount);
        this.balances.set(to, toBalance + amount);

        const transaction = {
            type: 'transfer',
            from: from,
            to: to,
            amount: amount,
            timestamp: new Date(),
            hash: this.generateTxHash()
        };

        this.transactions.unshift(transaction);
        return transaction;
    }

    burn(from, amount) {
        if (!this.isValidAddress(from)) {
            throw new Error('Invalid address format');
        }

        if (amount <= 0) {
            throw new Error('Amount must be positive');
        }

        const fromBalance = this.balances.get(from) || 0;
        if (fromBalance < amount) {
            throw new Error('Insufficient balance');
        }

        this.balances.set(from, fromBalance - amount);
        this.totalSupply -= amount;

        const transaction = {
            type: 'burn',
            from: from,
            to: null,
            amount: amount,
            timestamp: new Date(),
            hash: this.generateTxHash()
        };

        this.transactions.unshift(transaction);
        return transaction;
    }

    balanceOf(address) {
        if (!this.isValidAddress(address)) {
            throw new Error('Invalid address format');
        }
        return this.balances.get(address) || 0;
    }

    getAllHolders() {
        const holders = [];
        for (const [address, balance] of this.balances.entries()) {
            if (balance > 0) {
                holders.push({
                    address: address,
                    balance: balance,
                    percentage: ((balance / this.totalSupply) * 100).toFixed(2)
                });
            }
        }
        
        // Sort by balance descending
        holders.sort((a, b) => b.balance - a.balance);
        
        // Add rank
        holders.forEach((holder, index) => {
            holder.rank = index + 1;
        });
        
        return holders;
    }

    getTransactionHistory(limit = 50) {
        return this.transactions.slice(0, limit);
    }

    getTotalHolders() {
        let count = 0;
        for (const balance of this.balances.values()) {
            if (balance > 0) count++;
        }
        return count;
    }

    getCirculatingSupply() {
        return this.totalSupply;
    }

    searchHolder(searchTerm) {
        const holders = this.getAllHolders();
        return holders.filter(holder => 
            holder.address.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    getTokenInfo() {
        return {
            name: this.name,
            symbol: this.symbol,
            totalSupply: this.totalSupply,
            totalHolders: this.getTotalHolders(),
            circulatingSupply: this.getCirculatingSupply()
        };
    }

    // Utility method to format numbers
    static formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(2) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(2) + 'K';
        }
        return num.toLocaleString();
    }

    // Utility method to format address for display
    static formatAddress(address) {
        if (!address) return '';
        return address.slice(0, 6) + '...' + address.slice(-4);
    }

    // Utility method to format timestamp
    static formatTime(timestamp) {
        return new Date(timestamp).toLocaleString();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FungibleToken;
}
