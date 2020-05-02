pragma solidity ^0.5.0;
contract Context {
    constructor () internal {}
    function _msgSender() internal view returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view returns (bytes memory) {
        this;
        return msg.data;
    }
}

interface IERC20Available {
    function totalSupplyAvailable() external view returns (uint256);
    function balanceOfAvailable(address account) external view returns (uint256);
    function transferAvailable(address recipient, uint256 amount) external returns (bool);
    function allowanceAvailable(address owner, address spender) external view returns (uint256);
    function approveAvailable(address spender, uint256 amount) external returns (bool);
    function transferAvailableFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event TransferAvailable(address indexed from, address indexed to, uint256 value);
    event ApprovalAvailable(address indexed owner, address indexed spender, uint256 value);
}

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address recipient, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    event Syned(uint256 id, address indexed from, address indexed to, uint256 value, bool isValid);
    event Acked(uint256 id, address indexed from, address indexed to, uint256 value, bool isValid);
    event Synacked(uint256 id, address indexed from, address indexed to, uint256 value, bool isValid);
}
library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}


contract ERC20Available is Context, IERC20Available {
    using SafeMath for uint256;
    mapping (address => uint256) private _balancesAvailable;
    mapping (address => mapping (address => uint256)) private _allowancesAvailable;
    uint256 private _totalSupplyAvailable;

    function totalSupplyAvailable() public view returns (uint256) {
        return _totalSupplyAvailable;
    }

    function balanceOfAvailable(address account) public view returns (uint256) {
        return _balancesAvailable[account];
    }

    function transferAvailable(address recipient, uint256 amount) public returns (bool) {
        _transferAvailable(_msgSender(), recipient, amount);
        return true;
    }

    function allowanceAvailable(address owner, address spender) public view returns (uint256) {
        return _allowancesAvailable[owner][spender];
    }

    function approveAvailable(address spender, uint256 amount) public returns (bool) {
        _approveAvailable(_msgSender(), spender, amount);
        return true;
    }

    function transferAvailableFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transferAvailable(sender, recipient, amount);
        _approveAvailable(sender, _msgSender(), _allowancesAvailable[sender][_msgSender()].sub(amount, "exceeding allowanceAvailable"));
        return true;
    }

    function increaseAllowanceAvailable(address spender, uint256 addedValue) public returns (bool) {
        _approveAvailable(_msgSender(), spender, _allowancesAvailable[_msgSender()][spender].add(addedValue));
        return true;
    }

    function decreaseAllowanceAvailable(address spender, uint256 subtractedValue) public returns (bool) {
        _approveAvailable(_msgSender(), spender, _allowancesAvailable[_msgSender()][spender].sub(subtractedValue, "below zero"));
        return true;
    }

    function _transferAvailable(address sender, address recipient, uint256 amount) internal {
 
        _balancesAvailable[sender] = _balancesAvailable[sender].sub(amount, "ERC20: transferAvailable amount exceeds balance");
        _balancesAvailable[recipient] = _balancesAvailable[recipient].add(amount);
        emit TransferAvailable(sender, recipient, amount);
    }

    function _mintAvailable(address account, uint256 amount) internal {
         _totalSupplyAvailable = _totalSupplyAvailable.add(amount);
        _balancesAvailable[account] = _balancesAvailable[account].add(amount);
        emit TransferAvailable(address(0), account, amount);
    }

    function _burnAvailable(address account, uint256 amount) internal {
                _balancesAvailable[account] = _balancesAvailable[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupplyAvailable = _totalSupplyAvailable.sub(amount);
        emit TransferAvailable(account, address(0), amount);
    }

    function _approveAvailable(address owner, address spender, uint256 amount) internal {
        _allowancesAvailable[owner][spender] = amount;
        emit ApprovalAvailable(owner, spender, amount);
    }

    function _burnAvailableFrom(address account, uint256 amount) internal {
        _burnAvailable(account, amount);
        _approveAvailable(account, _msgSender(), _allowancesAvailable[account][_msgSender()].sub(amount, "allowanceAvailable"));
    }
}

contract ERC20 is Context, IERC20 {
    using SafeMath for uint256;
    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;
    uint256 private _totalSupply;

    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function transfer(address recipient, uint256 amount) public returns (bool) {
        _transfer(_msgSender(), recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public returns (bool) {
        _approve(_msgSender(), spender, amount);
        return true;
    }

    function transferFrom(address sender, address recipient, uint256 amount) public returns (bool) {
        _transfer(sender, recipient, amount);
        _approve(sender, _msgSender(), _allowances[sender][_msgSender()].sub(amount, "ERC20: transfer amount exceeds allowance"));
        return true;
    }

    function increaseAllowance(address spender, uint256 addedValue) public returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].add(addedValue));
        return true;
    }

    function decreaseAllowance(address spender, uint256 subtractedValue) public returns (bool) {
        _approve(_msgSender(), spender, _allowances[_msgSender()][spender].sub(subtractedValue, "ERC20: decreased allowance below zero"));
        return true;
    }

    function _transfer(address sender, address recipient, uint256 amount) internal {
          _balances[sender] = _balances[sender].sub(amount, "ERC20: transfer amount exceeds balance");
        _balances[recipient] = _balances[recipient].add(amount);
        emit Transfer(sender, recipient, amount);
    }

    function _mint(address account, uint256 amount) internal {
        _totalSupply = _totalSupply.add(amount);
        _balances[account] = _balances[account].add(amount);
        emit Transfer(address(0), account, amount);
    }

    function _burn(address account, uint256 amount) internal {
        _balances[account] = _balances[account].sub(amount, "ERC20: burn amount exceeds balance");
        _totalSupply = _totalSupply.sub(amount);
        emit Transfer(account, address(0), amount);
    }

    function _approve(address owner, address spender, uint256 amount) internal {
       _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }

    function _burnFrom(address account, uint256 amount) internal {
        _burn(account, amount);
        _approve(account, _msgSender(), _allowances[account][_msgSender()].sub(amount, "ERC20: burn amount exceeds allowance"));
    }

}
library Roles {
    struct Role {
        mapping (address => bool) bearer;
    }

    function add(Role storage role, address account) internal {
        require(!has(role, account), "Roles: account already has role");
        role.bearer[account] = true;
    }

    function remove(Role storage role, address account) internal {
        require(has(role, account), "Roles: account does not have role");
        role.bearer[account] = false;
    }

    function has(Role storage role, address account) internal view returns (bool) {
        require(account != address(0), "Roles: account is the zero address");
        return role.bearer[account];
    }

}

contract ERC20Detailed is IERC20 {
    string private _name;
    string private _symbol;
    uint8 private _decimals;
    constructor (string memory name, string memory symbol, uint8 decimals) public {
        _name = name;
        _symbol = symbol;
        _decimals = decimals;
    }

    function name() public view returns (string memory) {
        return _name;
    }

    function symbol() public view returns (string memory) {
        return _symbol;
    }

    function decimals() public view returns (uint8) {
        return _decimals;
    }

}



contract MinterRole is Context {
    using Roles for Roles.Role;

    event MinterAdded(address indexed account);
    event MinterRemoved(address indexed account);

    Roles.Role private _minters;

    constructor () internal {
        _addMinter(_msgSender());
    }

    modifier onlyMinter() {
        require(isMinter(_msgSender()), "MinterRole: caller does not have the Minter role");
        _;
    }

    function isMinter(address account) public view returns (bool) {
        return _minters.has(account);
    }

    function addMinter(address account) public onlyMinter {
        _addMinter(account);
    }

    function renounceMinter() public {
        _removeMinter(_msgSender());
    }

    function _addMinter(address account) internal {
        _minters.add(account);
        emit MinterAdded(account);
    }

    function _removeMinter(address account) internal {
        _minters.remove(account);
        emit MinterRemoved(account);
    }
}
contract ERC20Mintable is ERC20, MinterRole {
    function mint(address account, uint256 amount) public onlyMinter returns (bool) {
        _mint(account, amount);
        return true;
    }
}


contract TokenVortex is ERC20, ERC20Available, ERC20Detailed {
    constructor(uint256 initialSupply) ERC20Detailed("TokenVortex", "tkv", 0) public {
        _mint(msg.sender, initialSupply);
        _mintAvailable(msg.sender, initialSupply);
    }
       
   mapping (address => uint256) private _balancesAvailable;
   
       function externalTransferInit( uint256  id ,string memory uuid ,string memory key , address sender,address recipient, uint256 amount,bool isValid) public returns (bool) {
        return true;
    }
   
    function externalTransferSyn( uint256  id ,string memory uuid , string memory key , address sender,address recipient, uint256 amount,bool isValid) public returns (bool) {
         if(isValid){
            _burnAvailable(sender, amount);
            emit Syned(id, sender, recipient, amount,true);
            return true;
         }
        else{
            emit Syned(id, sender, recipient, amount,false);
            return false;
        }
    }
    
    function externalTransferSynAck( uint256  id ,string memory uuid , string memory key ,  address sender,address recipient, uint256 amount,bool isValid) public returns (bool) {
        if(isValid){
            _mint(recipient, amount);
            _mintAvailable(recipient,amount);
            emit Acked(id, sender, recipient, amount,true);
            return true;
        }
        else{
            emit Acked(id, sender, recipient, amount,false);
            return false;
        }
    }

    function externalTransferAck( uint256  id ,string memory uuid , string memory key ,  address sender, address recipient, uint256 amount,bool isValid) public returns (bool) {
        if(isValid){
        _burn(sender,amount);
        emit Synacked(id, sender, recipient, amount,true);
        return true;
        }
        else{
         _mintAvailable(sender,amount);
         emit Synacked(id, sender, recipient, amount,false);
        return false;
        }
    }

}