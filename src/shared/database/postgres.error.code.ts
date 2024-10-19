export enum PostgresErrorCode {
    UNIQUE_VIOLATION = '23505',                       // Duplicate entry
    NOT_NULL_VIOLATION = '23502',                     // Null value in a column with NOT NULL constraint
    FOREIGN_KEY_VIOLATION = '23503',                  // Foreign key violation
    CHECK_VIOLATION = '23514',                        // Fails a CHECK constraint
    EXCLUSION_VIOLATION = '23P01',                    // Exclusion constraint violation
    INVALID_TEXT_REPRESENTATION = '22P02',            // Invalid input syntax for type
    STRING_DATA_RIGHT_TRUNCATION = '22001',           // String exceeds column length
    DATA_EXCEPTION = '22000',                          // General data exception
    DIVISION_BY_ZERO = '22012',                        // Division by zero
    NUMERIC_VALUE_OUT_OF_RANGE = '22003',             // Numeric value out of range
    NULL_VALUE_NO_INDICATOR_PARAMETER = '22004',      // Null value in non-nullable column
    INVALID_PARAMETER_VALUE = '22005',                // Invalid parameter value
    TIMESTAMP_OUT_OF_RANGE = '22008',                 // Timestamp out of range
    INTERVAL_OUT_OF_RANGE = '22007',                  // Interval out of range
    INVALID_FOREIGN_KEY = '23503',                    // Invalid foreign key
    SERIALIZATION_FAILURE = '40001',                  // Serialization failure
    DEADLOCK_DETECTED = '40P01',                       // Deadlock detected
    LOCK_NOT_AVAILABLE = '55P03',                      // Lock not available
    QUERY_CANCELED = '57014',                         // Query was canceled
    TRANSACTION_ABORTED = '40B09',                    // Transaction aborted
    INVALID_TRANSACTION_STATE = '25000',              // Invalid transaction state
    INSUFFICIENT_PRIVILEGE = '42501',                 // Insufficient privilege
    INVALID_GRANT_OPERATION = '42502',                // Invalid grant operation
    NO_DATA_FOUND = 'No Data',                         // No data found
    FEATURE_NOT_SUPPORTED = '0A000',                   // Feature not supported
    CONNECTION_EXCEPTION = '08000',                    // Connection exception
    AUTHORIZATION_FAILURE = '28000',                   // Authorization failure
    PROTOCOL_VIOLATION = '08001',                     // Protocol violation
    INTERNAL_ERROR = 'XX000',                          // Internal error
    ERROR_IN_TRIGGER_PROTOCOL = 'P0001',              // Error in trigger protocol
  }
  