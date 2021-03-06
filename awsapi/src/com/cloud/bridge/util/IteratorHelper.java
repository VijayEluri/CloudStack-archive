/*
 * Copyright (C) 2011 Citrix Systems, Inc.  All rights reserved.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 *      http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
package com.cloud.bridge.util;

import java.util.Enumeration;
import java.util.Iterator;

/**
 * @author Kelven Yang
 */
public class IteratorHelper {
	public static <T> Iterable<T> enumerationAsIterable(final Enumeration<T> e) {
		return new Iterable<T> () {
			public Iterator<T> iterator() {
			    return new Iterator<T>() {
			    	public boolean hasNext() {
			    		return e.hasMoreElements();
			    	}

			    	public T next() {
			    		return e.nextElement();
			    	}

			    	public void remove() {
			    		throw new UnsupportedOperationException();
			    	}
			    };
			}
		};
	}
	
	public static <T> Enumeration<T> iteratorAsEnumeration(final Iterator<T> it) {
		return new Enumeration<T>() {
		    public boolean hasMoreElements() {
		        return it.hasNext();
		    }

		    public T nextElement() {
		        return it.next();
		    }
		};
	}
}
