export const Ballot = `
pragma solidity >=0.4.22 <0.6.0;
contract Ballot {

    struct Voter {
        uint weight;
        bool voted;
        uint8 vote;
        address delegate;
    }
    struct Proposal {
        uint voteCount;
    }

    address chairperson;
    mapping(address => Voter) voters;
    Proposal[] proposals;

    constructor(uint8 _numProposals) public {
        chairperson = msg.sender;
        voters[chairperson].weight = 1;
        proposals.length = _numProposals;
    }

    function giveRightToVote(address toVoter) public {
        if (msg.sender != chairperson || voters[toVoter].voted) return;
        voters[toVoter].weight = 1;
    }

    function delegate(address to) public {
        Voter storage sender = voters[msg.sender]; // assigns reference
        if (sender.voted) return;
        while (voters[to].delegate != address(0) && voters[to].delegate != msg.sender)
            to = voters[to].delegate;
        if (to == msg.sender) return;
        sender.voted = true;
        sender.delegate = to;
        Voter storage delegateTo = voters[to];
        if (delegateTo.voted)
            proposals[delegateTo.vote].voteCount += sender.weight;
        else
            delegateTo.weight += sender.weight;
    }

    function vote(uint8 toProposal) public {
        Voter storage sender = voters[msg.sender];
        if (sender.voted || toProposal >= proposals.length) return;
        sender.voted = true;
        sender.vote = toProposal;
        proposals[toProposal].voteCount += sender.weight;
    }

    function winningProposal() public view returns (uint8 _winningProposal) {
        uint256 winningVoteCount = 0;
        for (uint8 prop = 0; prop < proposals.length; prop++)
            if (proposals[prop].voteCount > winningVoteCount) {
                winningVoteCount = proposals[prop].voteCount;
                _winningProposal = prop;
            }
    }
}
`;


export const VendorR = `
pragma solidity ^0.5.4;


/// @title Vendor Registration contract. This is where vendors are registered in the system.
/// @notice This is where vendors are registered in the system.
contract VendorRegistration {

    mapping (uint256 => address[]) public table;

    event VendorRegistered(uint256 product_id, address vendor);

    constructor() public {
        registerVendor(msg.sender, 1);
    }

    /// @notice This function returns an available vendor for a given product
    /// @param product_id The id of the product registered in the system.
    /// @return vendor The Ethereum address of the vendor.
    function getVendor(uint256 product_id) view public returns (address vendor) {
        if (table[product_id].length == 0) {
            return address(0x0);
        }
        return table[product_id][0];
    }

    /// @notice This function registers a vendor in the system, for the given product.
    /// @param vendor The Ethereum address of the vendor.
    /// @param product_id The id of the product registered in the system.
    function registerVendor(address vendor, uint256 product_id) public {
        if (table[product_id].length == 0) {
            table[product_id] = new address[](0);
        }
        table[product_id].push(vendor);
        emit VendorRegistered(product_id, vendor);
    }
}
`;


export const Geopoint = `pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;


contract GeopointContract {

    struct Latitude {
        int32 latitude;
    }

    struct Longitude {
        int32 longitude;
    }

    struct Geopoint {
        Latitude longitude;
        Longitude latitude;
    }

    struct Area {
        Geopoint[7][3] geos;
        string name;
    }

    struct Store {
        Geopoint geo;
        string name;
    }

    uint256 storeCount;
    uint256 areaCount;
    mapping(uint256 => Store) public stores;

    Area area;

    constructor() public {
        area.name = '51';
    }

    function addStore(int32 longitude, int32 latitude, string memory name) public {
        Longitude memory lat = Longitude(longitude);
        Latitude memory lng = Latitude(latitude);
        Geopoint memory geo = Geopoint(lng, lat);
        stores[storeCount] = Store(geo, name);
        storeCount++;

        area.geos[0][0] = geo;
    }
}
`;


export const GeopointT = `pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;


contract GeopointContract {

    struct Store {
        Geopoint geo;
        string name;
    }

    uint256 storeCount;
    uint256 areaCount;
    mapping(uint256 => Store) public stores;

    Area area;

    constructor() public {
        area.name = '51';
    }

    function addStore(int32 longitude, int32 latitude, string memory name) public {
        Longitude memory lat = Longitude(longitude);
        Latitude memory lng = Latitude(latitude);
        Geopoint memory geo = Geopoint(lng, lat);
        stores[storeCount] = Store(geo, name);
        storeCount++;

        area.geos[0][0] = geo;
    }
}
`;


export const GeopointShortT = `pragma solidity >=0.4.22 <0.6.0;
pragma experimental ABIEncoderV2;


contract GeopointContract {

}
`;

// Geopoint[] public geopoints;
//
// function addGeopoint(int32 longitude, int32 latitude) public {
//     Geopoint memory geo = Geopoint(Longitude(longitude), Latitude(latitude));
//     geopoints.push(geo);
// }
