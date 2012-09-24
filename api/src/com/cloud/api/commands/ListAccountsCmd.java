// Copyright 2012 Citrix Systems, Inc. Licensed under the
// Apache License, Version 2.0 (the "License"); you may not use this
// file except in compliance with the License.  Citrix Systems, Inc.
// reserves all rights not expressly granted by the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// 
// Automatically generated by addcopyright.py at 04/03/2012
package com.cloud.api.commands;

import java.util.ArrayList;
import java.util.EnumSet;
import java.util.List;

import org.apache.log4j.Logger;

import com.cloud.api.ApiConstants;
import com.cloud.api.BaseListDomainResourcesCmd;
import com.cloud.api.IdentityMapper;
import com.cloud.api.Implementation;
import com.cloud.api.Parameter;
import com.cloud.api.ApiConstants.Details;
import com.cloud.api.response.AccountResponse;
import com.cloud.api.response.ListResponse;
import com.cloud.exception.InvalidParameterValueException;
import com.cloud.user.Account;

@Implementation(description="Lists accounts and provides detailed account information for listed accounts", responseObject=AccountResponse.class)
public class ListAccountsCmd extends BaseListDomainResourcesCmd {
	public static final Logger s_logger = Logger.getLogger(ListAccountsCmd.class.getName());
    private static final String s_name = "listaccountsresponse";

    /////////////////////////////////////////////////////
    //////////////// API parameters /////////////////////
    /////////////////////////////////////////////////////

    @Parameter(name=ApiConstants.ACCOUNT_TYPE, type=CommandType.LONG, description="list accounts by account type. Valid account types are 1 (admin), 2 (domain-admin), and 0 (user).")
    private Long accountType;

    @IdentityMapper(entityTableName="account")
    @Parameter(name=ApiConstants.ID, type=CommandType.LONG, description="list account by account ID")
    private Long id;

    @Parameter(name=ApiConstants.IS_CLEANUP_REQUIRED, type=CommandType.BOOLEAN, description="list accounts by cleanuprequred attribute (values are true or false)")
    private Boolean cleanupRequired;

    @Parameter(name=ApiConstants.NAME, type=CommandType.STRING, description="list account by account name")
    private String searchName;

    @Parameter(name=ApiConstants.STATE, type=CommandType.STRING, description="list accounts by state. Valid states are enabled, disabled, and locked.")
    private String state;
    

    @Parameter(name=ApiConstants.DETAILS, type=CommandType.LIST, collectionType=CommandType.STRING, description="comma separated list of details requested, value can be [ min, all]" )
    private List<String> viewDetails;
    
    
    /////////////////////////////////////////////////////
    /////////////////// Accessors ///////////////////////
    /////////////////////////////////////////////////////

    public Long getAccountType() {
        return accountType;
    }

    public Long getId() {
        return id;
    }

    public Boolean isCleanupRequired() {
        return cleanupRequired;
    }

    public String getSearchName() {
        return searchName;
    }

    public String getState() {
        return state;
    }
    
    
    public EnumSet<Details> getDetails() throws InvalidParameterValueException {
        EnumSet<Details> dv;
        if (viewDetails==null || viewDetails.size() <=0){
            dv = EnumSet.of(Details.all);
        }
        else {
            try {
                ArrayList<Details> dc = new ArrayList<Details>();
                for (String detail: viewDetails){
                    dc.add(Details.valueOf(detail));
                }
                dv = EnumSet.copyOf(dc);
            }
            catch (IllegalArgumentException e){
                throw new InvalidParameterValueException("The details parameter contains a non permitted value. The allowed values are " + EnumSet.allOf(Details.class));
            }
        }
        return dv;
    }

    /////////////////////////////////////////////////////
    /////////////// API Implementation///////////////////
    /////////////////////////////////////////////////////

    @Override
    public String getCommandName() {
        return s_name;
    }

    @Override
    public void execute(){
        List<? extends Account> accounts = _accountService.searchForAccounts(this);
        ListResponse<AccountResponse> response = new ListResponse<AccountResponse>();
        List<AccountResponse> accountResponses = new ArrayList<AccountResponse>();
        for (Account account : accounts) {
            AccountResponse acctResponse = _responseGenerator.createAccountResponse(account, getDetails());
            acctResponse.setObjectName("account");
            accountResponses.add(acctResponse);
        }
        response.setResponses(accountResponses);
        response.setResponseName(getCommandName());
        
        this.setResponseObject(response);
    }
}
