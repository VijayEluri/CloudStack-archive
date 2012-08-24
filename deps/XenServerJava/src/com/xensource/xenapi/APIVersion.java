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
package com.xensource.xenapi;

public enum APIVersion
{
    API_1_1, API_1_2, API_1_3, API_1_4, API_1_5, API_1_6, API_1_7, UNKNOWN;

    public static APIVersion latest()
    {
        return API_1_7;
    }

    public static APIVersion fromMajorMinor(long major, long minor)
    {
        if (major == 1 && minor == 7)
        {
            return API_1_7;
        }
        else if (major == 1 && minor == 6)
        {
            return API_1_6;
        }
        else if (major == 1 && minor == 5)
        {
            return API_1_5;
        }
        else if (major == 1 && minor == 4)
        {
            return API_1_4;
        }
        else if (major == 1 && minor == 3)
        {
            return API_1_3;
        }
        else if (major == 1 && minor == 2)
        {
            return API_1_2;
        }
        else if (major == 1 && minor == 1)
        {
            return API_1_1;
        }
        else
        {
            return UNKNOWN;
        }
    }

    @Override
    public String toString()
    {
        switch (this)
        {
        case API_1_1:
            return "1.1";
        case API_1_2:
            return "1.2";
        case API_1_3:
            return "1.3";
        case API_1_4:
            return "1.4";
        case API_1_5:
            return "1.5";
        case API_1_6:
            return "1.6";
        case API_1_7:
            return "1.7";
        default:
            return "Unknown";
        }
    }
}