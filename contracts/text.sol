// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import 'lib/openzeppelin-contracts/contracts/token/ERC20/IERC20.sol';

/// @title ExecutionContract
/// @notice Handles transaction processing and asset forwarding for ISAs
contract ExecutionContract {
    struct CallOps {
        address targetAddress;
        address approvalAddress;
        bytes executionData;
        address sourceToken;
        address refundRecipient;
        address relayerAddress;
        uint256 relayerFee;
    }

    // ... (Events - ExecutionSucceeded, ExecutionFailed, RefundIssued) ...

    /// @notice Processes ISA transactions
    /// @param callOps Encoded call operation parameters
    function processCallOps(CallOps calldata callOps) external payable {
        // ... (Handling ERC-20 vs. native asset transfers) ...

        // Try executing the call
        (bool success, bytes memory returnData) = callOps.targetAddress.call{ value: amount }(callOps.executionData);

        if (success) {
            // ... (Emit ExecutionSucceeded event) ...
        } else {
            // ... (Emit ExecutionFailed event with revert reason) ...

            // Handle refunds on failure
            // ... (Transfer assets to refundRecipient) ...
            // ... (Emit RefundIssued event) ...
        }
    }

    // ... (_getRevertReason function for decoding revert reasons) ...

    /// @dev This function allows the contract to accept Ether
    receive() external payable {}
}